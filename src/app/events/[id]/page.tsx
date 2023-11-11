import { validate } from "uuid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { fetchEvent } from "@/lib/actions";
import { redirect } from "next/navigation";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative h-[832px] w-[1241px] bg-zinc-200">
        <div className="absolute left-[31px] top-[36px] inline-flex h-6 w-[109px] items-center justify-center">
          <div className="w-[109px] font-['Roboto'] text-lg font-normal leading-normal text-gray-700 text-opacity-50">
            {format(event.date_from, "EE d MMMM", { locale: es })}
          </div>
        </div>
        <div className="absolute left-[31px] top-[36px] inline-flex h-6 w-[109px] items-center justify-center">
          <div className="w-[109px] font-['Roboto'] text-lg font-normal leading-normal text-gray-700 text-opacity-50">
            {format(event.date_to, "EE d MMMM", { locale: es })}
          </div>
        </div>
        <div className="absolute left-[184px] top-[36px] inline-flex h-6 w-[47px] items-center justify-center">
          <div className="w-[47px] font-['Roboto'] text-lg font-normal leading-normal text-gray-700 text-opacity-50">
            Hora{" "}
          </div>
        </div>
        <div className="absolute left-[332px] top-[36px] inline-flex h-6 items-center justify-end">
          <div className="w-[220px] font-['Roboto'] text-lg font-bold leading-normal text-gray-700">
            Valor mínimo del evento €
          </div>
        </div>
        <div className="absolute left-[459px] top-[36px] h-6 w-[57px]" />
        <div className="absolute left-[31px] top-[73px] inline-flex h-16 items-center justify-end">
          <div className="w-[456px] font-['Roboto'] text-[52px] font-extrabold leading-[64px] text-indigo-950">
            {event.name_event}
          </div>
        </div>
        <div className="absolute left-[30px] top-[151px] inline-flex h-12 w-[665px] items-center justify-center">
          <div className="w-[665px] font-['Roboto'] text-sm font-normal leading-normal text-gray-700">
            {event.description_long}
          </div>
        </div>
        <div className="absolute left-[30px] top-[151px] inline-flex h-12 w-[665px] items-center justify-center">
          <div className="w-[665px] font-['Roboto'] text-sm font-normal leading-normal text-gray-700">
            Acá va una breve descripción del evento por ejemplo un slogan o una
            cosa qué diga: la mejor fiesta de reggaeton de todo Berlín
          </div>
        </div>
        <div className="absolute left-[32px] top-[496px] inline-flex items-center justify-start pb-[7px] pr-[70px]">
          <div className="w-[712px] font-['Roboto'] text-sm font-normal leading-normal text-gray-700">
            Hola, soy una descripción mucho más larga que va a tener más o menos
            lo que el organizador quiera, <br />
            por ejemplo cosas que tienen que saber los asistentes. <br />
            Ejemplo:
            <br />
            Recuerden traer una mantita, o<br />
            Vamos a vender fernet por €8
          </div>
        </div>
        <div className="absolute left-[215px] top-[240px] w-[43px] text-center font-['Roboto'] text-sm font-normal leading-normal tracking-tight text-gray-50">
          Save
        </div>
        <div className="absolute left-[34px] top-[710px] w-[132px] font-['Inter'] text-2xl font-bold leading-7 text-indigo-950">
          Categorías
        </div>
        <div className="absolute left-[30px] top-[644px] w-[93px] font-['Inter'] text-2xl font-bold leading-7 text-indigo-950">
          Tickets
        </div>
        <div className="absolute left-[33px] top-[758px] inline-flex h-9 w-[107px] items-center justify-center">
          <div className="relative h-9 w-[107px]">
            <div className="absolute left-0 top-0 h-9 w-[107px] rounded-[48px] bg-stone-300 bg-opacity-50" />
            <div className="absolute left-[18px] top-[10px] w-[75px] text-center font-['Inter'] text-xs font-normal leading-none text-gray-700">
              Categoría 1
            </div>
          </div>
        </div>
        <div className="absolute left-[166px] top-[758px] inline-flex h-9 w-[107px] items-center justify-center">
          <div className="relative h-9 w-[107px]">
            <div className="absolute left-0 top-0 h-9 w-[107px] rounded-[48px] bg-stone-300 bg-opacity-50" />
            <div className="absolute left-[18px] top-[10px] w-[75px] text-center font-['Inter'] text-xs font-normal leading-none text-gray-700">
              Categoría 2
            </div>
          </div>
        </div>
        <div className="absolute left-[30px] top-[232px] inline-flex flex-col items-start justify-start gap-[7px]">
          <div className="w-[401px] font-['Inter'] text-2xl font-bold leading-7 text-indigo-950">
            Nombre del Organizador
          </div>
          <div className="inline-flex h-6 items-center justify-end">
            <div className="w-[539px] font-['Roboto'] text-sm font-normal leading-normal text-gray-700">
              datos de contacto (puede ser IG, mail, etc)
            </div>
          </div>
        </div>
        <div className="absolute left-[32px] top-[302px] inline-flex flex-col items-start justify-start gap-[13px]">
          <div className="w-[401px] font-['Inter'] text-2xl font-bold leading-7 text-indigo-950">
            Locación
          </div>
          <div className="font-['Inter'] text-sm font-normal leading-normal text-sky-500">
            Nombre de la calle, número, código postal, Berlín
          </div>
        </div>
        <div className="absolute left-[33px] top-[380px] w-[379px] font-['Inter'] text-2xl font-bold leading-7 text-indigo-950">
          Duración del evento
        </div>
        <div className="absolute left-[31px] top-[461px] w-[296px] font-['Inter'] text-2xl font-bold leading-7 text-indigo-950">
          Descripción larga
        </div>
        <div className="absolute left-[33px] top-[410px] h-10 w-10">
          <div className="absolute left-0 top-0 h-10 w-10 rounded-lg bg-zinc-200" />
          <div className="absolute left-[8px] top-[8px] h-6 w-6" />
        </div>
        <div className="absolute left-[77px] top-[420px] w-[75px] font-['Inter'] text-sm font-normal leading-tight text-gray-700">
          1 hour
        </div>
        <div className="absolute left-[33px] top-[681px] w-[501px] font-['Inter'] text-sm font-normal leading-tight text-gray-700">
          Este evento es gratuito o link de comprar entradas o contactar
          organizador
        </div>
      </div>
    </main>
  );
}