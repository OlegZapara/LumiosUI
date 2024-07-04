import { z } from "zod";

export const RatingSchema = z.object({
  id: z.number(),
  username: z.string().nullable(),
  userId: z.number(),
  reverence: z.number(),
});

export const MessageSchema = z.object({
  username: z.string().nullable(),
  messages: z.number(),
  dayMessages: z.any(),
  dailyMessages: z.any(),
  averageDailyMessages: z.any(),
});

export const DailyMessageSchema = z.object({
  time: z.number(),
  value: z.number(),
});

export const RatingResponseSchema = z.array(RatingSchema);

export const MessageResponseSchema = z.array(MessageSchema);

export type RatingInfo = z.infer<typeof RatingSchema>;
export type MessageInfo = z.infer<typeof MessageSchema>;
export type DailyMessageInfo = z.infer<typeof DailyMessageSchema>;
