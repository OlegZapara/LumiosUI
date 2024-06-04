import { z } from "zod";

export const TaskSchema = z.object({
  taskName: z.string().trim().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  dueDate: z.date({
    required_error: "A date of task is required",
  }),
  dueTime: z.string().time({
    precision: 0,
    message: "Invalid time format. Use HH:MM:SS (24-hour) format.",
  }),
  url: z
    .union([
      z.string().trim().url({
        message: "Invalid URL format",
      }),
      z.literal(""),
    ])
    .default(""),
});

export type Task = z.infer<typeof TaskSchema>;
