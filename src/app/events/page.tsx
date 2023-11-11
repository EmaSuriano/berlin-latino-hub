import Search from "@/ui/search";
import Image from "next/image";
import Link from "next/link";
import EventsTable from "@/ui/events-table";
import { Suspense } from "react";
import { TableSkeleton } from "@/ui/skeleton";

type Props = {
  searchParams?: {
    query?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query || "";

  return (
    <main className="flex min-h-screen flex-col items-center  space-y-4">
      <div className=" z-5 m-0 w-full max-w-5xl items-center justify-between p-0 font-mono text-sm lg:flex">
        <p className=" fixed  left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static  lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Link href="/">Back</Link>
        </p>
        <div className=" fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="m-0 w-full max-w-5xl p-0">
        <Search placeholder="Search events" />
      </div>
      {/* Streaming support ---> https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming */}
      <Suspense fallback={<TableSkeleton columns={4} />}>
        <EventsTable query={query} />
      </Suspense>{" "}
      <footer className="flex items-center justify-center py-10">
        Hecho por gente copada ❤️{" "}
      </footer>
    </main>
  );
}
