import { z } from "zod";

const CategoryEnum = z.enum(["Fiesta", "Cultural", "Concierto / Música", "Gastronomía", "Aire libre", "Mercado", "Para familias" ])
const TicketEnum = z.enum(["Gratis", "Contactar Organizador", "Donación" ])

// Zod validation first + type generation --> https://github.com/colinhacks/zod#basic-usage
export const EventsSchema = z.object({
  id: z.string(),
  name_event: z.string().min(3).max(100),
  name_organisator: z.string().min(3).max(100),
  contact_organisator: z.string().min(3).max(100),
  location: z.string(),
  description_long: z.string().max(1000),
  description_short: z.string().max(500),
  categories: CategoryEnum,
  date_from: z.coerce.date(),
  date_to: z.coerce.date(),
  event_url: z.string().url(),
  ticket_url: TicketEnum.or(z.string().url()),
  image: z.string().max(1000),
  price: z.number().or(z.string().max(10)),
});

export type Event = z.infer<typeof EventsSchema>;
