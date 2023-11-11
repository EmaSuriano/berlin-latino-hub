import CreateEventForm from "@/ui/create-event-form";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-auto text-4xl">
        {/* Mutation of data --> https://nextjs.org/learn/dashboard-app/mutating-data */}
        <CreateEventForm />
      </div>
    </main>
  );
}
