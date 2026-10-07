export const framework = {
  name: "btravstack",
  docs: "https://btravstack.github.io/btravstack/",
  tutorial: "https://btravstack.github.io/btravstack/tutorial/getting-started",
  repo: "https://github.com/btravstack/btravstack",
  blurb: "A TypeScript application kernel and starters for HTTP, Temporal and AMQP, with typed wiring and graceful shutdown.",
};

export const projects = [
  {
    key: "unthrown", tag: "Errors", name: "unthrown", pkg: "unthrown",
    logo: "/logos/unthrown",
    blurb: "Expected failures in the return type. A separate defect channel keeps unexpected failures visible without mixing them into your application errors.",
    points: ["Errors as values, typed in E", "A separate defect channel", "Zero runtime dependencies"],
    install: "pnpm add unthrown",
    repo: "https://github.com/btravstack/unthrown", docs: "https://btravstack.github.io/unthrown/",
  },
  {
    key: "entity", tag: "Domain", name: "entity", pkg: "@btravstack/entity",
    logo: "/logos/entity",
    blurb: "Declare your domain once. Derive types and request/response schemas from a field map, with sealed construction and behavior that stays with the entity.",
    points: ["Branded fields and immutable data", "Sealed construction, enforced invariants", "Result instead of throws"],
    install: "pnpm add @btravstack/entity",
    repo: "https://github.com/btravstack/btravstack/tree/main/packages/entity", docs: "https://btravstack.github.io/btravstack/entity/",
  },
  {
    key: "di", tag: "Wiring", name: "di", pkg: "@btravstack/di",
    logo: "/logos/di",
    blurb: "Declare ports, bind providers, compose modules. Check the wiring before the process starts and keep implementation details private. Part of the framework; usable on its own.",
    points: ["Ports named by the domain, not the adapter", "Unmet dependencies are compile errors", "Scoped resources release themselves"],
    install: "pnpm add @btravstack/di unthrown",
    repo: "https://github.com/btravstack/btravstack/tree/main/packages/di", docs: "https://btravstack.github.io/btravstack/reference/di/",
  },
  {
    key: "amqp", tag: "Messaging", name: "amqp-contract", pkg: "@amqp-contract/contract",
    logo: "/logos/amqp-contract",
    blurb: "Type-safe contracts for AMQP & RabbitMQ. Define your exchanges, queues and messages once — get types and runtime validation on both ends.",
    points: ["End-to-end type safety", "Reliable retry with Dead Letter Queues", "AsyncAPI 3.0 generation"],
    install: "pnpm add @amqp-contract/contract",
    repo: "https://github.com/btravstack/amqp-contract", docs: "https://btravstack.github.io/amqp-contract/",
  },
  {
    key: "temporal", tag: "Workflows", name: "temporal-contract", pkg: "@temporal-contract/contract",
    logo: "/logos/temporal-contract",
    blurb: "Type-safe contracts for Temporal.io. End-to-end types and automatic validation across workflows, activities and clients.",
    points: ["Zod validation at every boundary", "Compile-time implementation checks", "Result / Future error handling"],
    install: "pnpm add @temporal-contract/contract",
    repo: "https://github.com/btravstack/temporal-contract", docs: "https://btravstack.github.io/temporal-contract/",
  },
];

export const tooling = [
  { name: "tools", logo: "/logos/tools", description: "Shared configs and workflows for building and shipping TypeScript.", repo: "https://github.com/btravstack/tools" },
  { name: "@btravstack/theme", logo: "/logos/theme", description: "The VitePress theme and design tokens behind these docs.", repo: "https://github.com/btravstack/btravstack.github.io/tree/main/packages/theme" },
];

export const documentedProjects = [framework, ...projects];
