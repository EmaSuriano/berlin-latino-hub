"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Event, EventsSchema } from "./schema";
import { z } from "zod";
import { dateToSql } from "./utils";
import { FC } from "react";

const CreateEvent = EventsSchema.omit({ id: true });

export type EventCreation = z.infer<typeof CreateEvent>;

export type EventComponent = FC<{
  name: keyof EventCreation;
  errors: string[];
}>;

type FormDataErrors = z.inferFlattenedErrors<typeof CreateEvent>;

export type State = {
  errors?: FormDataErrors["fieldErrors"];
  message?: string | null;
};

export async function createEvent(_: State, formData: FormData) {
  // Validate form fields using Zod

  const validatedFields = CreateEvent.safeParse({
    name_event: formData.get("name_event"),
    location: formData.get("location"),
    description_long: formData.get("description_long"),
    description_short: formData.get("description_short"),
    event_url: formData.get("event_url"),
    date_from: formData.get("date_from"),
    date_to: formData.get("date_to"),
    name_organisator: formData.get("name_organisator"),
    contact_organisator: formData.get("contact_organisator"),
    category: formData.get("category"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Event.",
    };
  }

  // Prepare data for insertion into the database
  const {
    name_event,
    name_organisator,
    contact_organisator,
    location,
    description_long,
    description_short,
    category,
    date_from,
    date_to,
    event_url,
  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO events (name_event, name_organisator, contact_organisator,location, description_long, description_short, categories, date_from, date_to, event_url)
      VALUES (
        ${name_event},
        ${name_organisator},
        ${contact_organisator},
        ${location},
        ${description_long},
        ${description_short},
        ${category},
        ${dateToSql(date_from)},
        ${dateToSql(date_to)},
        ${event_url})
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
    name_event ILIKE ${`%${query}%`} OR
    location ILIKE ${`%${query}%`} OR
    description_short ILIKE ${`%${query}%`} OR
    description_long ILIKE ${`%${query}%`} OR
    event_url ILIKE ${`%${query}%`}
  ORDER BY date_from DESC
`;

export const fetchEvent = (id: string) => sql<Event>`
  SELECT * FROM events
  WHERE id = ${id}
`;
