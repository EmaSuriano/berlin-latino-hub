"use server";

import { fetchEvents } from "@/lib/actions";
import { Event } from "@/lib/schema";

const TABLE_ROWS: (keyof Event)[] = ["name", "date", "location", "description", "url"];

export default async function EventsTable({ query }: { query: string }) {
  const data = await fetchEvents(query);

  return (
    <table className="m-auto table-auto">
      <thead>
        <tr>
          {TABLE_ROWS.map((row) => (
            <th key={row}>{row}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((event) => (
          <tr key={event.id}>
            {TABLE_ROWS.map((row) => (
              <td key={event.id + row}>
                <p>{event[row].toString()}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
