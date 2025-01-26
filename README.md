# Sanctions Screening Tool

Checks if a blockchain address is sanctioned using the Chainalysis API.

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create `.env` file in root directory:
```
CHAINALYSIS_API_KEY=your_api_key_here
```

3. Load environment variables:
```bash
source .env
```

## Usage

Run the script with an address as argument:
```bash
node main.js 0x1234...
```

## Rate Limits
- 5000 requests per 5 minutes
- Returns 403 error when limit exceeded

## Response
- Green message if address is not sanctioned
- Red warning with detailed information if sanctioned
- Includes: name, description, category, and reference URL for sanctioned addresses

## Error Handling
- Displays HTTP status code and error type for API issues
- Exits with status code 1 on errors
- Validates address input presence

## API Documentation
For more details, see the [Chainalysis API docs](https://public.chainalysis.com/docs/index.html#introduction)

## Requirements
- Node.js 14+
- Yarn
- Chainalysis API key

## Dependencies
- axios: API requests
- chalk: Terminal coloring
- dotenv: Environment variables