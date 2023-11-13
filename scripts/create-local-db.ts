import { PLACEHOLDER_EVENTS } from "../src/lib/placeholder-data";
import { writeFileSync } from "fs";

async function main() {
  return writeFileSync(
    "./storage.json",
    JSON.stringify(PLACEHOLDER_EVENTS, null, 2),
  );
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
