import { PLACEHOLDER_EVENTS } from "../src/lib/placeholder-data";
import { writeFileSync } from "fs";

/**
 * Setup local file called storage.json where we have local events
 * This is useful for:
 *  - You have no internet and wants to run the project
 *  - We want to run the project without credentials (or we receive contributions)
 *  - We want to run tests in CI (because we don't have the .env in Github (yet))
 */
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
