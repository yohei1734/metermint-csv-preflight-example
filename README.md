# MeterMint CSV Preflight — Node.js quickstart

This minimal example checks a customer CSV before your existing importer runs. It calls the published MeterMint endpoint on RapidAPI and prints the deterministic report.

## Try it

1. Open [MeterMint on RapidAPI](https://metermint-csv-preflight.metermint-csv-preflight.workers.dev/go/rapidapi), choose a plan, and copy your RapidAPI key.
2. Use Node.js 18 or newer and set the key only in your shell:

```bash
export RAPIDAPI_KEY='your-key'
npm test
```

`npm test` sends `fixtures/malformed.csv`. A working integration receives HTTP `422` with `DUPLICATE_HEADER` and `ROW_WIDTH_MISMATCH`; those are expected CSV findings, not a transport failure.

To check another file:

```bash
node preflight.mjs path/to/file.csv
```

The example never writes the key or CSV body to disk. Do not commit credentials. Requests transit RapidAPI and Cloudflare; do not submit secrets or regulated/sensitive personal data.

## Contract

- Endpoint: `POST https://metermint-csv-preflight.p.rapidapi.com/v1/preflight`
- Success: HTTP `200` with `report.valid: true`
- Parsed CSV with structural findings: HTTP `422` with stable issue codes and row/column locations
- Request cap: 256 KiB
- Deterministic parsing; no AI correction

See the [public API overview and live proof](https://metermint-csv-preflight.metermint-csv-preflight.workers.dev/) or [subscribe/test on RapidAPI](https://metermint-csv-preflight.metermint-csv-preflight.workers.dev/go/rapidapi).

