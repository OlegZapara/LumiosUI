import { z } from "zod";

const TelegramChatSchema = z.object({
  id: z.number(),
  admin: z.boolean(),
  name: z.string(),
  description: z.string(),
});

const TelegramUserSchema = z.object({
  username: z.string(),
  accountId: z.string(),
  chats: z.array(TelegramChatSchema),
});

export type TelegramChat = z.infer<typeof TelegramChatSchema>;
export type TelegramUser = z.infer<typeof TelegramUserSchema>;
