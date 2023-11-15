"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { State, validateCreateForm } from "../form";
import { v4 } from "uuid";
import { saveLocalEvent } from "../local-db";
import prisma from "../prisma";

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
  } else {
    await prisma.event.create({ data: validatedFields.data });
  }

  revalidatePath("/events");
  redirect("/events");
}
