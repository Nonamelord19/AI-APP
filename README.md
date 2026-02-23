# AI Learning Demo (Next.js App Router)

A minimal responsive demo website for an AI learning product.

## Features

- `/` landing page with CTA to `/demo`
- `/demo` list of quests loaded from `content/quests.v1.json`
- `/demo/quests/[id]` detail page with localized quest fields and textarea input
- Language switch with query param `?lang=uk|en|ru` (default: `uk`)
- `POST /api/ai/improve`
  - Demo mode if `OPENAI_API_KEY` is missing
  - OpenAI Responses API mode if key exists

## Setup

1. Install dependencies:

```bash
npm install
```

2. (Optional) set OpenAI key:

```bash
export OPENAI_API_KEY=your_key_here
```

3. Run dev server:

```bash
npm run dev
```

4. Open: `http://localhost:3000`

## API Example

```bash
curl -X POST http://localhost:3000/api/ai/improve \
  -H "Content-Type: application/json" \
  -d '{"text":"please improve this text", "lang":"en"}'
```

Response:

```json
{
  "improvedText": "...",
  "reasons": ["...", "..."]
}
```
