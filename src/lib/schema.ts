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
  name_event: z.string().min(3).max(500),
  name_organisator: z.string().min(3).max(500),
  contact_organisator: z.string().min(3).max(500),
  location: z.string(),
  description_long: z.string().max(1000),
  description_short: z.string().max(500),
  category: z.enum(CATEGORY_LIST),
  date_from: datelikeToDate,
  date_to: datelikeToDate,
  event_url: z.string().url(),
  // ticket_url: TicketEnum.or(z.string().url()),
  // image: z.string().optional(),
  // price: z.number().or(z.string().max(100)),
});

export type Event = z.infer<typeof EventsSchema>;
