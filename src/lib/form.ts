import { z } from "zod";
import { EventSchema } from "./schema";
import { FC } from "react";

const CreateEvent = EventSchema.omit({ id: true });

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

// used to make sure that we are passing all the keys to the `safeParse` function
export const parseFormData = (
  form: Record<keyof EventCreation, File | string | null>,
) => CreateEvent.safeParse(form);

export const validateCreateForm = (formData: FormData) => {
  return parseFormData({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    url: formData.get("url"),
    dateFrom: formData.get("dateFrom"),
    dateTo: formData.get("dateTo"),
    category: formData.get("category"),
    image: formData.get("image"),
  });
};
