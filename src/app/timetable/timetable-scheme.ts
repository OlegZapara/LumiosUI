import { z } from "zod";

const classEntrySchema = z.object({
  className: z.string().min(1, { message: "className must not be empty" }),
  url: z.string().min(1, { message: "url must not be empty" }),
  classType: z.string().min(1, { message: "classType must not be empty" }),
  startTime: z.string().min(1, { message: "startTime must not be empty" }),
  endTime: z.string().min(1, { message: "endTime must not be empty" }),
});

const daySchema = z.object({
  dayName: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
  classEntries: z.array(classEntrySchema),
});

const weekSchema = z.object({
  days: z.array(daySchema),
  weekType: z.enum(["WEEK_A", "WEEK_B"]),
});

export const timetableScheme = z.array(weekSchema);
