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

const datelike = z.union([z.number(), z.string(), z.date()]);
const datelikeToDate = datelike.pipe(z.coerce.date());

// Zod validation first + type generation --> https://github.com/colinhacks/zod#basic-usage
export const EventSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(500),
  location: z.string(),
  description: z.string(),
  category: z.enum(CATEGORY_LIST),
  dateFrom: datelikeToDate,
  dateTo: datelikeToDate,
  url: z.string(),
  // remove restriction of unsplash once we have our own uploader
  image: z.string().includes("images.unsplash.com").url(),
});

export type Event = z.infer<typeof EventSchema>;
