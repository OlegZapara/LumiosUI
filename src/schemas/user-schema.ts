import { z } from "zod";

export const TelegramChatSchema = z.object({
  id: z.number(),
  admin: z.boolean(),
  name: z.string(),
  description: z.string(),
});

export const TelegramUserSchema = z.object({
  username: z.string(),
  accountId: z.number(),
  chatId: z.number(),
  isAdmin: z.boolean(),
});

export const LoginResponseSchema = z.object({
  username: z.string(),
  accountId: z.number(),
  chats: z.array(TelegramChatSchema),
});

export type TelegramChat = z.infer<typeof TelegramChatSchema>;
export type TelegramUser = z.infer<typeof TelegramUserSchema>;
