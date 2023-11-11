"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Event, EventsSchema } from "./schema";
import { z } from "zod";
import { dateToSql } from "./utils";

const CreateEvent = EventsSchema.omit({ id: true });

type FormDataErrors = z.inferFlattenedErrors<typeof CreateEvent>;

export type State = {
  errors?: FormDataErrors["fieldErrors"];
  message?: string | null;
};

export async function createEvent(_: State, formData: FormData) {
  // Validate form fields using Zod

  const validatedFields = CreateEvent.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    url: formData.get("url"),
    date: formData.get("date"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Event.",
    };
  }

  // Prepare data for insertion into the database
  const { name, location, description, url, date } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO events (name, location, description, date, url)
      VALUES (${name}, ${location}, ${description}, ${dateToSql(date)}, ${url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Event.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/events");
  redirect("/events");
}

export const fetchEvents = (query: string) => sql<Event>`
  SELECT * FROM events
  WHERE
    name ILIKE ${`%${query}%`} OR
    location ILIKE ${`%${query}%`} OR
    description ILIKE ${`%${query}%`} OR
    url ILIKE ${`%${query}%`}
  ORDER BY date DESC
`;

export const fetchEvent = (id: string) => sql<Event>`
  SELECT * FROM events
  WHERE id = ${id}
`;
