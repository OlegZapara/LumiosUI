import { z } from "zod";

const QueueUserSchema = z.object({
  username: z.string().min(1, { message: "username must not be empty" }),
  name: z.string().min(1, { message: "name must not be empty" }),
  accountId: z.number(),
});

const QueueSchema = z.object({
  alias: z.string().min(1, { message: "alias must not be empty" }),
  id: z.string(),
  messageId: z.string(),
  pinned: z.boolean().optional(),
  isMixed: z.boolean(),
  contents: z.array(QueueUserSchema),
});

export type QueueUser = z.infer<typeof QueueUserSchema>;
export type Queue = z.infer<typeof QueueSchema>;
