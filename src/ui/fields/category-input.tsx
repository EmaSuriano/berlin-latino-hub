"use client";

import { CATEGORY_LIST } from "@/lib/schema";
import Select from "react-select";
import { EventComponent } from "@/lib/actions";
import { PencilIcon } from "@heroicons/react/24/outline";

const options = CATEGORY_LIST.map((c) => ({
  value: c,
  label: c,
}));

export const CategoryInput: EventComponent = ({ name, errors }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {name}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <Select id={name} name={name} options={options} required />
          <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      {errors ? (
        <div
          id="amount-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-500"
        >
          {errors.join(", ")}
        </div>
      ) : null}
    </div>
  );
};
