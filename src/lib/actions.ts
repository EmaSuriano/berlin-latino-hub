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
  onDateSelect?: (date_from: Date, date_to: Date) => void;
}>;

type FormDataErrors = z.inferFlattenedErrors<typeof CreateEvent>;

export type State = {
  errors?: FormDataErrors["fieldErrors"];
  message?: string | null;
};

const parseFormData = (
  form: Record<keyof EventCreation, File | string | null>,
) => CreateEvent.safeParse(form);

export async function createEvent(_: State, formData: FormData) {
  // Validate form fields using Zod

  const validatedFields = parseFormData({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    url: formData.get("url"),
    date_from: formData.get("date_from"),
    date_to: formData.get("date_to"),
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
  const { name, location, description, category, date_from, date_to, url } =
    validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO events (name, location, description, category, date_from, date_to, url)
      VALUES (
        ${name},
        ${location},
        ${description},
        ${category},
        ${dateToSql(date_from)},
        ${dateToSql(date_to)},
        ${url})
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
  ORDER BY date_from DESC
`;

export const fetchEvent = (id: string) => sql<Event>`
  SELECT * FROM events
  WHERE id = ${id}
`;
