"use server";
import Image from "next/image";
import { fetchEvents } from "@/lib/actions";
import Link from "next/link";
import { formatDateToLocal } from "@/lib/utils";

export default async function EventsTable({ query }: { query: string }) {
  const data = await fetchEvents(query);

  const truncateDescription = (description: string) => {
    return description.length > 200 ? description.substring(0, 200) + "..." : description;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

 
    return (
      <div className="m-10 flex flex-wrap justify-center gap-4">
        {data.rows.map((event) => (
          <div
            key={event.id}
            className="flex w-[405px] flex-col rounded-xl border border-black border-opacity-70 bg-white p-4 dark:bg-slate-800"
          >
            <h2 className="mb-2 text-xl font-bold">{event.name}</h2>
            <div className="mb-6 flex-grow flex place-content-between">
              <p className="text-sm font-medium">{truncateDescription(event.description)}</p>
              {event.image ? (
                // Imagen del evento
                <Image
                  src={isValidUrl(event.image) ? event.image : "/front-back.jpeg"}
                  alt="Imagen del evento"
                  layout="fixed"
                  width={150}
                  height={150}
                  className="ml-4 rounded-xl shadow-xl"
                />
              ) : (
                // Imagen por defecto
                <Image
                  src="/front-back.jpeg"
                  alt="Imagen por defecto"
                  layout="fixed"
                  width={150}
                  height={150}
                  className="ml-4 rounded-xl shadow-xl"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-normal">
                  Fecha: {formatDateToLocal(event.date_from.toDateString(), "es")}
                </span>
              </div>
              <Link
                href={`/events/${event.id}`}
                className="rounded-md bg-[#00C2D1] px-2 py-1 text-xs font-normal text-[#0A1045]"
              >
                ir a evento
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
  

