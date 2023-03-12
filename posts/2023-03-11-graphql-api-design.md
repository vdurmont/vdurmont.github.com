---
tags: post
layout: post
title: GraphQL API design
date: 2023-03-11
---

I have been working with GraphQL and REST for years and both are awesome ways to structure a public API. When designing your API, it is important to understand the philosophy of the technologies you're using to make it something that everyone can use easily. While REST design is a well know activity, I realized that since GraphQL is a more recent tech, many engineers are not super familiar with the principles that should drive the API design.

I developed some expertise in GraphQL API design over the years and I found myself explaining a lot of principles and giving a lot of advice to my teammates. I thought it might be interesting to share those more broadly 🙃

# Posts about GraphQL

This post serves as table of contents for all the articles I'll write about GraphQL API design.

- [Use edges, not IDs](/posts/2023-03-12-graphql-use-edges-not-ids)
- More to come soon, stay tuned!

# How I learned GraphQL?

The beginning of my career was extremely REST heavy. I always had a knack for API design, one of my favorite activities is to connect systems together in a scalable way. I built a lot of REST APIs and when I moved to San Francisco, I joined API design groups and meetups... the dream!

My first contact with GraphQL was when I joined Facebook in 2015. Facebook is the creator of GraphQL and everything runs on GraphQL over there. I was building internal tools for them, both on the backend (Hack/PHP) and web/mobile (React, then React Native).

I had a lot of exposure to GraphQL API design by working closely with the [Relay team](https://relay.dev/) as a beta tester when they were iterating on their first and second version. My team was the first product test for the new tech before it reached the public website. We would implement huge web apps using React+Relay to discover what worked and didn't work early on.

I then refactored and rebuilt from the ground up the entire API for [Novi](https://novi.com/), working closely with both backend and client engineers. I spent a lot of time advocating for a principled design and growing engineers into better API architects, both on the server side (how to expose things in the best way) and on the frontend side (how to consume such an API efficiently).

Finally, I am currently building our public APIs and SDKs at Lightspark, applying again those same principles.
