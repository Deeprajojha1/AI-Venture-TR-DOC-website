# AI Venture Studio API Examples

## Login
POST `/api/auth/login`

```json
{
  "email": "founder@example.com",
  "password": "password123"
}
```

## Create Project
POST `/api/projects`

```json
{
  "name": "FinAI Ledger",
  "industry": "Fintech",
  "targetUsers": "SMB finance teams",
  "country": "United States",
  "budget": "$250,000",
  "timeline": "6 Months",
  "idea": "An AI accounting agent for reconciliation, fraud detection, and cashflow forecasting."
}
```

## Run Workflow
POST `/api/projects/:id/run`

```json
{
  "mode": "manual"
}
```

Use `"auto"` to run the complete chain.
