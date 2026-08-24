import { readFile } from "node:fs/promises";

const [, , csvPath, mode] = process.argv;
const apiKey = process.env.RAPIDAPI_KEY;

if (!csvPath) {
  console.error("Usage: node preflight.mjs <csv-file> [--expect-invalid]");
  process.exit(2);
}

if (!apiKey) {
  console.error("RAPIDAPI_KEY is required. Copy it from your RapidAPI application and set it only in your shell.");
  process.exit(2);
}

const csv = await readFile(csvPath, "utf8");
const response = await fetch(
  "https://metermint-csv-preflight.p.rapidapi.com/v1/preflight",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "metermint-csv-preflight.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
    body: JSON.stringify({ csv, options: { includeNormalized: false } }),
  },
);

const payload = await response.json();
console.log(JSON.stringify(payload, null, 2));

const accepted = response.status === 200 || (mode === "--expect-invalid" && response.status === 422);
if (!accepted) {
  console.error(`Unexpected HTTP status: ${response.status}`);
  process.exit(1);
}

