import { getLocalEvents } from "../local-db";
import prisma from "../prisma";

export const fetchEvents = (query: string) => {
  if (process.env.LOCAL_DB) {
    return getLocalEvents().filter((evt) =>
      evt.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return prisma.event.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
  });
};
