---
tags: post
layout: post
title: GraphQL — Use Connections, not Lists
date: 2024-01-30
---

_I write a series of posts about GraphQL API design. Find the full list [here](/posts/2023-03-11-graphql-api-design)!_

# TL;DR

In order to enable proper pagination and give you an opportunity to add metadata, it is strongly recommended to never return lists of items, but Connections.

You can find all of this [in the official GraphQL docs](https://graphql.org/learn/pagination/).

# The longer explanation

When you are trying to return a set of items, the default intuition is to return a list. However, lists have some limitations that quickly arise when designing your API.

## List of items

Let's say we have an account and we want to fetch that account's transactions. The first intuition consists in adding a field that returns the list of transactions:

```graphql
query Test {
  my_account {
    transactions {
      id
      amount
    }
  }
}
```

When calling the server you'd get a response like this one:

```json
{
  "my_account": {
    "transactions": [
      {"id": "123", "amount": "$5"},
      {"id": "456", "amount": "$8"},
      {"id": "789", "amount": "$3"},
    ]
  }
}
```

However, pretty quickly, you'll realize that you can't return ALL the transactions. If the account has thousands or millions of them, it'll be a pretty big issue.

## List of items with pagination

We will quickly introduce a way to only select a subset of the transactions. For example, using the `first` argument:

```graphql
query Test {
  my_account {
    transactions(first: 10) {
      id
      amount
    }
  }
}
```

## List of edges

We'll also want to be able to select which page we want to display. In general, we could indicate what is the offset, or the last ID that we've seen. GraphQL recommends using a cursor-based pagination. Cursors are opaque, and can be either the IDs, or an offset, or any other identifier that the server generates. We can use it with the `after` argument.

However, cursors are not really part of the items themselves, so GraphQL recommends to wrap each item in an "edge" object that will contain the item itself (usually called `node`), as well as the `cursor`.

```graphql
query Test($last_cursor: String!) {
  my_account {
    transactions(first: 10, after: $last_cursor) {
      cursor
      node {
        id
        amount
      }
    }
  }
}
```

Note that if you have additional information that are not properties of the item or the parent themselves, but rather of their relationship, you can add them to the edge object easily.

An example could be that we'd have an edge between an Auditor and a Transaction that has a status with options "Reviewed" and "Pending Review". Once the auditor reviews the transaction they could change the status but it wouldn't affect the object itself and other auditors might still have it in their review queues.

## Connections with metadata

Now, there are some data that you may want to expose that describes the relationship between the parent object and its items but that is not specific to an item. For example, the `count` of all the items. Or in our example, the `amount_received`. We can handle this by adding separate fields on the parent object, but it seems much better to add a wrapping object around the list.

```graphql
query Test($last_cursor: String!) {
  my_account {
    transactions(first: 10, after: $last_cursor) {
      count
      amount_received
      amount_sent
      edges {
        cursor
        node {
          id
          amount
        }
      }
    }
  }
}
```

## Connections with pagination metadata

Now that we have a wrapping object, we can actually use it to return a lot of information about the pagination itself. Examples of things that could be useful:
- `end_cursor`: the cursor of the last edge of this page, to use with the `after` argument in the next request
- `has_next_page`: a boolean that indicates whether there are more items to load
- And the pagination could go in the other direction... We could use `start_cursor` with a `before` argument, and `has_previous_page`.

All of this can be return in a `page_info` object:

```graphql
query Test($last_cursor: String!) {
  my_account {
    transactions(first: 10, after: $last_cursor) {
      count
      amount_received
      amount_sent
      edges {
        cursor
        node {
          id
          amount
        }
      }
      page_info {
        end_cursor
        has_next_page
      }
    }
  }
}
```

## Simplifying things

While the above example follows the official recommendation, I found that I usually don't have a lot of use for the `edge` object. While I still leave the option to add this field, I usually end up exposing a `nodes` field that directly exposes the items in the connection instead of wrapping them. It's just a shortcut and do not prevent you from adding `edges` if you need them.

```graphql
query Test($last_cursor: String!) {
  my_account {
    transactions(first: 10, after: $last_cursor) {
      count
      amount_received
      amount_sent
      nodes {
        id
        amount
      }
      page_info {
        end_cursor
        has_next_page
      }
    }
  }
}
```

# Counter Examples

Is there value in exposing basic lists sometimes? Yes. If you are 100% sure that the list of items will be super small (less than 20(?) items, no pagination ever required) and that you won't ever need to expose additional metadata on edges or the connection itself... then you can use a list!

Honestly, I found that those case are pretty rare. In my experience, we expose lists because we're lazy and then we pay the price of having to introduce breaking changes to our API when the list inevitably becomes richer, more complex, and requires more information.

# Further reading

I recommend to read the [official GraphQL documentation](https://graphql.org/learn/pagination/) as well as the [Relay Connection Spec](https://relay.dev/graphql/connections.htm) that really define all of this in a much more detailed way.
