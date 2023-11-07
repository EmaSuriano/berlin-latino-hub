import { db } from "@vercel/postgres";

async function main() {
  const client = await db.connect();

  await client.sql`DELETE FROM events`;
  console.log(`All events wiped!`);

  // @ts-expect-error end() declaration not existing in client
  return client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
