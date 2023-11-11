"use server";

import { fetchEvents } from "@/lib/actions";
import Link from "next/link";

export default async function EventsTable({ query }: { query: string }) {
  const data = await fetchEvents(query);

  return (
    <div className="m-10 flex flex-wrap justify-center gap-4">
      {data.rows.map((event) => (
        <div
          key={event.id}
          className="flex w-[405px] flex-col rounded-xl border border-black border-opacity-70 bg-white p-4"
        >
          <h2 className="mb-4 text-xl font-bold">{event.name}</h2>
          <p className="mb-4 text-sm font-medium">{event.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-normal">Cuando:</span>
              <span className="text-xs font-normal">fecha</span>
            </div>

            <Link
              href={`/events/${event.id}`}
              className="rounded-md bg-sky-500 px-2 py-1 text-xs font-normal text-black"
            >
              ir a evento
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
