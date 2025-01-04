# NCN Portal

## Features

NCN Portal is a Claude web interface developed using Next.js and the [Claude Chat API](https://platform.openai.com/docs/api-reference/chat). It's compatible with both ClaudeAI.

- Deploy a custom Claude web interface that supports markdown, prompt storage, and multi-person chats.
- Create a private, web-based Claude for use among friends without sharing your API key.
- Clear and expandable codebase, ideal as a starting point for your next AI Next.js project.

## Prerequisites

- You need an Claude account.
- Solna Wallet installed.

### Environment Variables

```txt
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_SOLANA_RPC_URL=
```

### Deploy with Docker

For OpenAI account users:

```
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY="<REPLACE-ME>" \
   blrchen/chatgpt-lite
```

For Azure OpenAI account users:

```
docker run -d -p 3000:3000 \
   -e AZURE_OPENAI_API_BASE_URL="<REPLACE-ME>" \
   -e AZURE_OPENAI_API_KEY="<REPLACE-ME>" \
   -e AZURE_OPENAI_DEPLOYMENT="<REPLACE-ME>" \
   blrchen/chatgpt-lite
```

## Development

### Running Locally

1. Install NodeJS 20.
2. Clone the repository.
3. Install dependencies with `yarn`.
4. Copy `.env.example` to `.env.local` and update environment variables.
5. Start the application using `yarn dev`.
6. Visit `http://localhost:3000` in your browser.

### Running Locally with Docker

1. Clone the repository and navigate to the root directory.
2. Update the `OPENAI_API_KEY` environment variable in the `docker-compose.yml` file.
3. Build the application using `docker-compose build .`.
4. Start it by running `docker-compose up -d`.

## Environment Variables

Required environment variables:

For OpenAI account:

| Name                     | Description           | Default Value           |
| ------------------------ | --------------------- | ----------------------- |
| NEXT_PUBLIC_API_BASE_URL | Interact with backend | `http://localhost:3000` |
