import { z } from "zod";

export const CATEGORY_LIST = [
  "Fiesta",
  "Cultural",
  "Concierto / Música",
  "Gastronomía",
  "Aire libre",
  "Mercado",
  "Para familias",
] as const;

// const TicketEnum = z.enum(["Gratis", "Contactar Organizador", "Donación" ])
const datelike = z.union([z.number(), z.string(), z.date()]);
const datelikeToDate = datelike.pipe(z.coerce.date());

// Zod validation first + type generation --> https://github.com/colinhacks/zod#basic-usage
export const EventsSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(500),
  location: z.string(),
  description: z.string(),
  category: z.enum(CATEGORY_LIST),
  date_from: datelikeToDate,
  date_to: datelikeToDate,
  url: z.string().url(),
});

export type Event = z.infer<typeof EventsSchema>;
