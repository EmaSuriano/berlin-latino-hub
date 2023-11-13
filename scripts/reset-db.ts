import { VercelPoolClient, db } from "@vercel/postgres";
import { PLACEHOLDER_EVENTS } from "../src/lib/placeholder-data";
import { dateToSql } from "../src/lib/utils";

// Logic taken from --> https://github.com/vercel/next-learn/blob/main/dashboard/starter-example/scripts/seed.js

async function seedEvents(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "events" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      description VARCHAR(1000),
      date_to DATE NOT NULL,
      date_from DATE NOT NULL,
      url VARCHAR(255) NOT NULL,
      category VARCHAR(255),
      image VARCHAR(255)
    );
    `;

    console.log(`Created "events" table`);

    // Insert data into the "events" table
    const insertedEvents = await Promise.all(
      PLACEHOLDER_EVENTS.map(
        (event) => client.sql`
        INSERT INTO events (id, name, location, description, category, date_from, date_to, url, image)
        VALUES (
          ${event.id},
          ${event.name},
          ${event.location},
          ${event.description},
          ${event.category},
          ${dateToSql(event.date_from)},
          ${dateToSql(event.date_to)},
          ${event.url},
          ${event.image}
        );
      `,
      ),
    );

    console.log(`Created ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error("Error seeding events:", error);
    throw error;
  }
}

async function dropEventsTable(client: VercelPoolClient) {
  await client.sql`DROP TABLE events`;
  console.log(`Removed "events" table`);
}

async function main() {
  const client = await db.connect();

  await dropEventsTable(client);
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
