"use client";

import { useFormState } from "react-dom";
import { EventComponent, EventCreation, createEvent } from "@/lib/actions";
import { TextInput } from "./fields/text-input";
import { TextArea } from "./fields/text-area";
import { CalendarInput } from "./fields/calendar-input";

const FIELDS: Record<keyof EventCreation, EventComponent> = {
  name: TextInput,
  location: TextInput,
  date_from: CalendarInput,
  date_to: CalendarInput,
  description: TextArea,
  url: TextInput,
  category: TextInput,
  image: TextInput
};

export default function CreateEventForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEvent, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
        {Object.entries(FIELDS).map(([name, Component]) => {
          const key = name as keyof EventCreation;
          return (
            <Component
              key={key}
              name={key}
              errors={(state.errors && state.errors[key]) || []}
            />
          );
        })}

        {state.message ? (
          <div aria-live="polite" className="my-2 text-sm text-red-500">
            <p>{state.message}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </form>
  );
}
