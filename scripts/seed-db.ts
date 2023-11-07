import { VercelPoolClient, db } from "@vercel/postgres";
import { events } from "../src/lib/placeholder-data";
import { dateToSql } from "../src/lib/utils";

// Logic taken from --> https://github.com/vercel/next-learn/blob/main/dashboard/starter-example/scripts/seed.js

async function seedEvents(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "events" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS events (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "events" table`);

    // Insert data into the "events" table
    const insertedEvents = await Promise.all(
      events.map(
        (event) => client.sql`
        INSERT INTO events (id, name, location, date, url)
        VALUES (
          ${event.id},
          ${event.name},
          ${event.location},
          ${dateToSql(event.date)},
          ${event.url}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error("Error seeding events:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedEvents(client);

  // @ts-expect-error end() declaration not existing in client
  return client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
