---
tags: post
layout: post
title: GraphQL — Use edges, not IDs
date: 2023-03-12
---

# TL;DR

Never expose a field with another entity ID, instead, you should expose an edge to that other entity and let the client crawl the graph.

```graphql
type Transaction {
  id: ID!
  amount: Int!
  sender_id: ID! # BAD!
  sender: User! # GOOD!
}
```

# The longer explanation

As its name indicates, GraphQL (Graph Query Language) is based on the idea that the client will find an entry point in the graph using one of the top-level query/mutation/subscription, and will then be able to crawl the graph and fetch the data it needs.

When you expose another entity's ID, you prevent the client from hoping the edge and fetching that other entity's data. You force the client to issue one or more additional HTTP requests for something that could have been done in a single one.

Remember that a core principle of GraphQL is that the server doesn't cater to the specific needs of each client, but instead exposes an API that provides access to the whole graph and lets each client decide what is right for them. So don't think about "what does my client need today" but "how do I expose the whole graph in a consistent and structured way".

# Examples

## Displaying the details of an entity

Imagine that I am building a banking app and I want to display the details of a transaction I received.

If you were exposing IDs, you would have to first query the transaction details, then query the additional data from the sender. Below is a simple example in Python:

```python
async def print_transaction_details() -> None:
  data = await execute_bad_query()
  sender_id = data.transaction.sender_id
  sender_data = await execute_sender_query(variables={"id": sender_id})
  print(f"You received {data.amount} USD from {sender_data.name}.")
```

```graphql
query BadQuery($id: ID!) {
  transaction(id: $id) {
    amount
    sender_id
  }
}

query SenderQuery($id: ID!) {
  user(id: $id) {
    name
  }
}
```

When you expose an edge, it becomes much easier, you only have to execute a single query!

```python
async def print_transaction_details() -> None:
  data = await execute_good_query()
  print(f"You received {data.amount} USD from {data.sender.name}.")
```

```graphql
query GoodQuery($id: ID!) {
  transaction(id: $id) {
    amount
    sender {
      name
    }
  }
}
```

## Displaying the details of an list of entities

The example above was a very simple, with a single edge. But things could have been much worse. Imagine that you want to display a list of transactions now!

Without edges, you have to execute `n+1` requests (`n` being the number of transactions you decide to display).

```python
async def print_transaction_details() -> None:
  data = await execute_bad_query(variables={"number_of_transactions": 10})
  for transaction in data.transactions:
    sender_id = transaction.sender_id
    sender_data = await execute_sender_query(variables={"id": sender_id})
    print(f"You received {data.amount} USD from {sender_data.name}.")
```

```graphql
query BadQuery($number_of_transaction: Int!) {
  transactions(first=$number_of_transaction) {
    amount
    sender_id
  }
}

query SenderQuery($id: ID!) {
  user(id: $id) {
    name
  }
}
```

But still a single transaction if you're using edges!

```python
async def print_transaction_details() -> None:
  data = await execute_good_query(variables={"number_of_transactions": 10})
  for transaction in data.transactions:
    print(f"You received {transaction.amount} USD from {transaction.sender.name}.")
```

```graphql
query GoodQuery($number_of_transaction: Int!) {
  transactions(first=$number_of_transaction) {
    amount
    sender {
      name
    }
  }
}
```
