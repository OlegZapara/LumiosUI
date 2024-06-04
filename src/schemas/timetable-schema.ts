import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

export const TimetableEntrySchema = z.object({
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

export const TimetableDaySchema = z.object({
  dayName: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
  classEntries: z.array(TimetableEntrySchema),
});

export const TimetableWeekSchema = z.object({
  days: z.array(TimetableDaySchema),
  weekType: z.enum(["WEEK_A", "WEEK_B"]),
});

export const TimetableSchema = z.array(TimetableWeekSchema);

export type TimetableEntry = z.infer<typeof TimetableEntrySchema>;
export type TimetableDay = z.infer<typeof TimetableDaySchema>;
export type TimetableWeek = z.infer<typeof TimetableWeekSchema>;
export type Timetable = z.infer<typeof TimetableSchema>;
