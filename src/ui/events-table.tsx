"use server";

import { fetchEvents } from "@/lib/actions";
import { Event } from "@/lib/schema";
import Link from "next/link";

export default async function EventsTable({ query }: { query: string }) {
  const data = await fetchEvents(query);

  return (
    <div className="flex flex-wrap justify-center gap-4 m-10">
      {data.rows.map((event) => (
        <div key={event.id} className="flex flex-col rounded-xl border border-black border-opacity-70 bg-white p-4 w-[405px]">
          <h2 className="text-xl font-bold mb-4">{event.name}</h2>
          <p className="text-sm font-medium mb-4">
            Descripcion del evento...
          </p>
          <div className="flex justify-between items-center">
            <div>

              <span className="text-xs font-normal">Cuando: </span>
              <span className="text-xs font-normal">fecha</span>
            </div>
            
            <Link href={`/events/${event.id}`}  className="text-xs font-normal bg-sky-500 text-black rounded-md px-2 py-1">
                ir a evento
            </Link>
            
          </div>
        </div>
      ))}
    </div>
  );
}
