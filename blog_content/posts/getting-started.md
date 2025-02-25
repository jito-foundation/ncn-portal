---
title: Getting Started with NCN
description: A beginner's guide to using NCN in your projects
date: 2025-02-26
author: NCN Team
tags:
  - tutorials
  - guide
---

# Getting Started with NCN

This guide will walk you through the basics of getting started with NCN in your projects.

## Prerequisites

Before you begin, make sure you have:

- Node.js installed (v16 or higher)
- Basic familiarity with JavaScript or TypeScript
- A code editor of your choice

## Installation

You can install NCN using npm:

```bash
npm install @jito/ncn
```

Or if you prefer yarn:

```bash
yarn add @jito/ncn
```

## Basic Setup

Create a new file called `ncn-config.js` in your project root:

```javascript
module.exports = {
  // Basic configuration
  project: "my-awesome-project",
  environment: process.env.NODE_ENV || "development",

  // Advanced options
  options: {
    feature1: true,
    feature2: false,
  },
};
```

## Your First NCN Application

Now let's create a simple application:

```javascript
const { NCNClient } = require("@jito/ncn");

async function main() {
  // Initialize the client
  const client = new NCNClient();

  // Connect to the service
  await client.connect();

  // Your business logic here
  const result = await client.performOperation({
    type: "example",
    data: { foo: "bar" },
  });

  console.log("Operation result:", result);

  // Disconnect when done
  await client.disconnect();
}

main().catch(console.error);
```

## Next Steps

Now that you have a basic understanding of NCN, check out these resources:

- API Documentation
- Configuration Guide
- Advanced Examples
