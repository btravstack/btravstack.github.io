---
layout: home

hero:
  name: btravstack
  text: An expressive, robust TypeScript backend
  tagline: Type-safe building blocks for Node — contracts for your messaging and workflows, and a principled way to handle errors. Define things once, let the types flow everywhere.
  image:
    light: /logos/btravstack-light.svg
    dark: /logos/btravstack-dark.svg
    alt: btravstack
  actions:
    - theme: brand
      text: Explore on GitHub
      link: https://github.com/btravstack

features:
  - icon:
      light: /logos/amqp-contract-light.svg
      dark: /logos/amqp-contract-dark.svg
    title: amqp-contract
    details: Type-safe contracts for AMQP & RabbitMQ. Define exchanges, queues and messages once — get types and runtime validation on both ends, reliable retries with DLQs, and AsyncAPI 3.0 generation.
    link: https://btravstack.github.io/amqp-contract/
    linkText: Read the docs
  - icon:
      light: /logos/temporal-contract-light.svg
      dark: /logos/temporal-contract-dark.svg
    title: temporal-contract
    details: Type-safe contracts for Temporal.io. End-to-end types and automatic validation across workflows, activities and clients, with Result / Future error handling.
    link: https://btravstack.github.io/temporal-contract/
    linkText: Read the docs
  - icon:
      light: /logos/unthrown-light.svg
      dark: /logos/unthrown-dark.svg
    title: unthrown
    details: Explicit errors as values, with a separate defect channel for the unexpected. Only a true defect ever throws, and only at unwrap. Zero runtime dependencies.
    link: https://btravstack.github.io/unthrown/
    linkText: Read the docs
---
