"use client";

import { useFormState } from "react-dom";
import { createEvent } from "@/lib/actions";
import { TextInput } from "./fields/text-input";
import { TextArea } from "./fields/text-area";
import { CalendarInput } from "./fields/calendar-input";
import { EventComponent, EventCreation } from "@/lib/form";

const FIELDS: Record<keyof EventCreation, EventComponent> = {
  name: TextInput,
  location: TextInput,
  date_from: CalendarInput,
  date_to: CalendarInput,
  description: TextArea,
  url: TextInput,
  category: TextInput,
  image: TextInput,
};

export default function CreateEventForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEvent, initialState);

  return (
    <form action={dispatch}>
      <div className="grid grid-cols-1 gap-5 rounded-md bg-gray-200 p-4 dark:bg-gray-900 md:grid-cols-2 md:p-6">
        {Object.entries(FIELDS).map(([name, Component]) => {
          const key = name as keyof EventCreation;
          return (
            <div key={key} className="capitalize">
              <Component
                name={key}
                errors={(state.errors && state.errors[key]) || []}
              />
            </div>
          );
        })}

        {state.message && (
          <div
            aria-live="polite"
            className="col-span-full my-2 text-sm text-red-500"
          >
            <p>{state.message}</p>
          </div>
        )}

        <button
          type="submit"
          className="col-span-full mt-2 flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </form>
  );
}
