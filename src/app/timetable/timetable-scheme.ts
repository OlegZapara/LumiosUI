import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

export const timetableEntryScheme = z.object({
  className: z.string().min(1, { message: "className must not be empty" }),
  url: z.string(),
  classType: z.string().min(1, { message: "classType must not be empty" }),
  startTime: z.string().refine((value) => timeRegex.test(value), {
    message: "Invalid time format. Expected hh:mm:ss",
  }),
  endTime: z.string().refine((value) => timeRegex.test(value), {
    message: "Invalid time format. Expected hh:mm:ss",
  }),
});

export const daySchema = z.object({
  dayName: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
  classEntries: z.array(timetableEntryScheme),
});

export const weekSchema = z.object({
  days: z.array(daySchema),
  weekType: z.enum(["WEEK_A", "WEEK_B"]),
});

export const timetableScheme = z.array(weekSchema);
