import { z } from "zod";

// Zod validation first + type generation --> https://github.com/colinhacks/zod#basic-usage
export const EventsSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  location: z.string(),
  date: z.coerce.date(),
  description: z.string().max(1000),
  url: z.string().url(),
});

export type Event = z.infer<typeof EventsSchema>;
