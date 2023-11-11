import Search from "@/ui/search";
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
