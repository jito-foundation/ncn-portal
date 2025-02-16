# NCN Portal

## Features

NCN Portal is a Claude web interface developed using Next.js and the [Claude Chat API](https://platform.openai.com/docs/api-reference/chat). It's compatible with both ClaudeAI.

- Deploy a custom Claude web interface that supports markdown, prompt storage, and multi-person chats.
- Create a private, web-based Claude for use among friends without sharing your API key.
- Clear and expandable codebase, ideal as a starting point for your next AI Next.js project.

## Prerequisites

- [Volta](https://docs.volta.sh/guide/) installed (optional).
- You need an Claude account.
- Solna Wallet installed.

### Environment Variables

```txt
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_SOLANA_CHAIN=solana:devnet
```

## Development

### Running Locally

1. Install NodeJS 20.
2. Clone the repository.
3. Install dependencies with `yarn`.
4. Copy `.env.example` to `.env.local` and update environment variables.
5. Start the application using `yarn dev`.
6. Visit `http://localhost:3000` in your browser.

## Environment Variables

Copy `.env.example`.

```bash
cp .env.example .env
```

Required environment variables:

| Name                     | Description           | Default Value           |
| ------------------------ | --------------------- | ----------------------- |
| NEXT_PUBLIC_API_BASE_URL | Interact with backend | `http://localhost:8080` |
