"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dateToSql } from "../utils";
import { State, validateCreateForm } from "../form";
import { v4 } from "uuid";
import { saveLocalEvent } from "../local-db";

export async function createEvent(
  _: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = validateCreateForm(formData);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Event.",
    };
  }

  if (process.env.LOCAL_DB) {
    saveLocalEvent({ id: v4(), ...validatedFields.data });
    revalidatePath("/events");
    redirect("/events");
  }

  // Prepare data for insertion into the database
  const {
    name,
    location,
    description,
    category,
    date_from,
    date_to,
    url,
    image,
  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
    INSERT INTO events (name, location, description, category, date_from, date_to, url, image)
    VALUES (
      ${name},
      ${location},
      ${description},
      ${category},
      ${dateToSql(date_from)},
      ${dateToSql(date_to)},
      ${url},
      ${image})`;
  } catch (error: any) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: Failed to Create Event. ${error.toString()}`,
    };
  }

  revalidatePath("/events");
  redirect("/events");
}
