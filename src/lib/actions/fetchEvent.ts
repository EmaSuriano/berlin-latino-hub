"use server";

import { getLocalEvents } from "../local-db";
import prisma from "../prisma";

export const fetchEvent = (id: string) => {
  if (process.env.LOCAL_DB) {
    return getLocalEvents().find((evt) => evt.id === id);
  }

  return prisma.event.findUnique({ where: { id } });
};
