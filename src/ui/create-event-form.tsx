"use client";

import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { createEvent } from "@/lib/actions";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const FIELDS = ["name", "location", "description", "url", "date"] as const;

export default function CreateEventForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEvent, initialState);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDates: Date[]) => {
    setDate(selectedDates[0]);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
        {FIELDS.map((field) => {
          const errors = state.errors && state.errors[field];
          return (
            <div className="mb-4" key={field}>
              <label htmlFor={field} className="mb-2 block text-sm font-medium">
                {field}
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  {field === "date" ? (
                    <Flatpickr
                      value={date}
                      onChange={handleDateChange}
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800"
                    />
                  ) : (
                    <input
                      id={field}
                      name={field}
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800"
                      aria-describedby="amount-error"
                      required
                    />
                  )}
                  <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>

              {errors ? (
                <div
                  id="amount-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
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
