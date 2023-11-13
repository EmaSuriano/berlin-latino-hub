"use server";

import { readFileSync, writeFileSync } from "fs";
import { Event, EventSchema } from "./schema";
import path from "path";
import { z } from "zod";

const PATH = path.join(path.resolve("."), "/storage.json");

const EventsSchema = z.array(EventSchema);

export const getLocalEvents = (): Event[] => {
  const a = readFileSync(PATH);
  return EventsSchema.parse(JSON.parse(a.toString()));
};

export const saveLocalEvent = (event: Event) => {
  const events = getLocalEvents();
  return writeFileSync(PATH, JSON.stringify([...events, event], null, 2));
};
