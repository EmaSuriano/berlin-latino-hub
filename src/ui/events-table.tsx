"use server";
import Image from "next/image";
import { fetchEvents } from "@/lib/actions";
import Link from "next/link";
import { formatDateToLocal } from "@/lib/utils";

export default async function EventsTable({ query }: { query: string }) {
  const data = await fetchEvents(query);

  return (
    <div className="m-10 flex flex-wrap justify-center gap-4">
      {data.rows.map((event) => (
        <div
          key={event.id}
          className="flex w-[405px] flex-col rounded-xl border border-black border-opacity-70 bg-white p-4"
        >
          <h2 className="mb-2 text-xl font-bold">{event.name}</h2>
          <div className="mt-0  mb-6 flex place-content-between">
            <p className="mb-4 mr-4 text-sm font-medium">{event.description}</p>
            <Image
              src="/front-back.jpeg"
              alt="logo"
              width={150}
              height={150}
              className="shadow-black-500 rounded-xl shadow-xl ml-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-normal">
                Cuando?:{" "}
                {formatDateToLocal(event.date_from.toDateString(), "es")}
              </span>
              {/* <span className="text-xs font-normal">fecha</span> */}
            </div>
            <Link
              href={`/events/${event.id}`}
              className="rounded-md bg-[#00C2D1] px-2 py-1 text-xs font-normal text-black"
            >
              ir a evento
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
