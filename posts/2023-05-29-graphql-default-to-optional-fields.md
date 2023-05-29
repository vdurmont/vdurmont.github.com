---
tags: post
layout: post
title: GraphQL — Default to optional fields
date: 2023-05-29
---

_I write a series of posts about GraphQL API design. Find the full list [here](/posts/2023-03-11-graphql-api-design)!_

# TL;DR

Prefer to expose fields that are optional instead of required. In case of an error, GraphQL will only nullify a branch of the data tree but the rest of the data will still render properly.

# The longer explanation

Error handling in GraphQL works as follows:

- If a field is required and generates an error, the whole object will be nullified.
- If a field is optional and generates an error, only that specific branch of the tree will be nullified.

This means that using optional fields will make it easier for your clients to gracefully handle errors and maybe display partial data. Using required fields will prevent them from displaying anything.

GraphQL APIs are usually designed to be used by multiple types of clients and I usually think it's best to stay flexible and let each of them decide what they can and cannot display.

# Example

## With required fields

Imagine the following schema:

```graphql
type Query {
  transaction(id: ID!): Transaction
}

type Transaction {
  id: ID!
  amount: Int!
  sender: Person!
}

type Person {
  name: String!
  avatar_url: String!
}
```

We could easily imagine a client that would display the details of a transaction. They may issue the following query:

```graphql
query MyAwesomeQuery($id: ID!) {
  transaction(id: $id) {
    id
    amount
    sender {
      name
      avatar_url
    }
  }
}
```

And their frontend may look a bit like this:

```typescript
function TransactionDetails(props: Props) {
  const transaction = props.transaction;
  if (!transaction) {
    return <div>Cannot find the transaction.</div>;
  }
  return (
    <div>
      <h1>{transaction.id}</h1>
      <p>Amount: USD {transaction.amount}</p>
      <p>The transaction was sent by {transaction.sender.name}.</p>
      <img src={transaction.sender.avatar_url} />
    </div>
  );
}
```

Now, let's say that there is some issue when generating the `avatar_url` of the `sender` (maybe the CDN is down?). The JSON response will look like this:

```json
{
  "data": {
    "transaction": null
  },
  "errors": [
    { "key": "AvatarException", "message": "Cannot generate the avatar URL." }
  ]
}
```

The `sender` object will not be generated at all since one of its required fields is missing. This means that the `transaction` itself won't generate because the `sender` field is missing. And the client displays the "Cannot find the transaction." error message, which is a poor experience.

## With optional fields

Now, let's rewrite this example with optional fields. The schema becomes:

```graphql
type Query {
  transaction(id: ID!): Transaction
}

type Transaction {
  id: ID!
  amount: Int!
  sender: Person!
}

type Person {
  name: String!
  avatar_url: String
}
```

The frontend can now handle partial data:

```typescript
function TransactionDetails(props: Props) {
  const transaction = props.transaction;
  if (!transaction) {
    return <div>Cannot find the transaction.</div>;
  }
  return (
    <div>
      <h1>{transaction.id}</h1>
      <p>Amount: USD {transaction.amount}</p>
      <p>The transaction was sent by {transaction.sender.name}.</p>
      <img src={transaction.sender.avatar_url || PLACEHOLDER_AVATAR_URL} />
    </div>
  );
}
```

If the avatar URL cannot be generated, the response will look like this:

```json
{
  "data": {
    "transaction": {
      "id": "1234567890",
      "amount": 42,
      "sender": {
        "name": "Vincent",
        "avatar_url": null
      }
    }
  },
  "errors": [
    { "key": "AvatarException", "message": "Cannot generate the avatar URL." }
  ]
}
```

The client can use a placeholder for the avatar URL and still display most of the information. Of course, we can take that logic further by making the `sender` field optional too, etc.

# When not to do it?

As in every rule/advice, there are always exceptions. I usually make fields required when without them, the object doesn't really make "sense". This is done on a case-by-case basis but here are some examples:

- A transaction without an `amount` might not make sense
- A person without a `name` might not make sense
- A lightning node without a `public_id_key` might not make sense
- etc.

Use your best judgement for the context of your application 😉
