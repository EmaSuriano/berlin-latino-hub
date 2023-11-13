import { sql } from "@vercel/postgres";
import { Event } from "../schema";
import { getLocalEvents } from "../local-db";

export const SEARCH_FIELDS: (keyof Event)[] = [
  "name",
  "location",
  "description",
  "url",
];

export const fetchEvents = (query: string) => {
  if (process.env.LOCAL_DB) {
    return {
      rows: getLocalEvents().filter((evt) =>
        SEARCH_FIELDS.some((field) =>
          evt[field].toString().toLowerCase().includes(query.toLowerCase()),
        ),
      ),
    };
  }

  const whereClauses = SEARCH_FIELDS.map(
    (field) => `${field} ILIKE ${`%${query}%`}`,
  );

  return sql<Event>`
    SELECT * FROM events
    WHERE ${whereClauses.join(" OR ")}
    ORDER BY date_from DESC
  `;
};
