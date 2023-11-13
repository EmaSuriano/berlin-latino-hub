import { fetchEvent } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { validate } from "uuid";
import { formatDateToLocal } from "@/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
  if (!validate(params.id)) {
    redirect("/404");
  }
  const eventQuery = await fetchEvent(params.id);

  const [event] = eventQuery.rows;

  if (!event) {
    redirect("/404");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
      <div className="w-full max-w-7xl overflow-hidden rounded-lg bg-zinc-200 shadow-lg dark:bg-zinc-800">
        <div className="p-4">
          <h1 className="mb-2 text-2xl font-bold dark:text-gray-200 lg:text-4xl">
            {event.name}
          </h1>
          <p className="text-sm font-bol-7xext-gray-600 dark:text-gray-400 lg:text-base">
            Fecha:{" "}
            <span className="font-normal">
              {formatDateToLocal(event.date_from.toDateString(), "es")}
            </span>
          </p>
        </div>
        <Image
          src={event.image || "/front-back.jpeg"}
          alt="Event Image"
          width={500}
          height={300}
          className="w-full object-cover"
        />

        <div className="p-4">
          <p className="mb-4 text-sm font-bold text-gray-700 dark:text-gray-400 lg:text-base">
            Descripcion del evento:
          </p>
          <p className="mb-4 text-sm text-gray-700 dark:text-gray-400 lg:text-base">
            {event.description}
          </p>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400  lg:text-base">
            Organizado por: <span className="font-normal">{event.name}</span>
          </p>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 lg:text-base">
            Categoría: <span className="font-normal">{event.category}</span>
          </p>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 lg:text-base">
            Ubicación: <span className="font-normal">{event.location}</span>
          </p>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 lg:text-base">
            Ir a la pagina oficial del evento:{" "}
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-blue-600 hover:text-blue-800"
            >
              {event.url}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
