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
      name_event VARCHAR(255) NOT NULL,
      name_organisator VARCHAR(255) NOT NULL,
      contact_organisator VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      description_long TEXT,
      description_short VARCHAR(500),
      categories VARCHAR(255),
      date_from TIMESTAMP WITH TIME ZONE NOT NULL,
      date_to TIMESTAMP WITH TIME ZONE,
      event_url VARCHAR(255) NOT NULL,
      ticket_url VARCHAR(255),
      image VARCHAR(1000),
      price NUMERIC(10, 2),
    );
    `;

    console.log(`Created "events" table`);

    // Insert data into the "events" table
    const insertedEvents = await Promise.all(
      PLACEHOLDER_EVENTS.map(
        (event) => client.sql`
        INSERT INTO events (id, name_event, name_organisator,location, contact_organisator, date, url, description_long, description_short, categories, date_from, date_to, event_url , ticket_url, image, price)
        VALUES (
          ${event.id},
          ${event.name_event},
          ${event.name_organisator},
          ${event.contact_organisator},
          ${event.location},
          ${event.description_long},
          ${event.description_short},
          ${event.categories},
          ${dateToSql(event.date_from)},
          ${dateToSql(event.date_to)},
          ${event.event_url},
          ${event.ticket_url},
          ${event.image},
          ${event.price}
        );
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
