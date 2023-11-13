"use server";

import { sql } from "@vercel/postgres";
import { getLocalEvents } from "../local-db";

export const fetchEvent = (id: string) => {
  if (process.env.LOCAL_DB) {
    return { rows: getLocalEvents().filter((evt) => evt.id === id) };
  }

  return sql<Event>`
    SELECT * FROM events
    WHERE id = ${id}
  `;
};
