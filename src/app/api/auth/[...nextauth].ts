import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

type TelegramCredentials = {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

type TelegramUser = {
  id: string;
  first_name: string;
  username: string;
  photo_url: string;
};

export const verifyTelegramLogin = (query: TelegramCredentials): boolean => {
  const { hash, ...data } = query;
  const secret = crypto
    .createHash("sha256")
    .update(process.env.TELEGRAM_BOT_TOKEN as string)
    .digest();
  const checkString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key as keyof typeof data]}`)
    .join("\n");
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(checkString)
    .digest("hex");
  return hmac === hash;
};

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram",
      name: "Telegram",
      credentials: {
        id: { type: "text" },
        first_name: { type: "text" },
        username: { type: "text" },
        photo_url: { type: "text" },
        auth_date: { type: "text" },
        hash: { type: "text" },
      },
      authorize: async (credentials, req) => {
        if (credentials == undefined) return null;
        const credentialsAsNumber: TelegramCredentials = {
          id: parseInt(credentials.id),
          first_name: credentials.first_name,
          username: credentials.username,
          photo_url: credentials.photo_url,
          auth_date: parseInt(credentials.auth_date),
          hash: credentials.hash,
        };

        const isValid = verifyTelegramLogin(credentialsAsNumber);
        if (!isValid) {
          return null;
        }
        return {
          id: credentialsAsNumber.id.toString(),
          first_name: credentialsAsNumber.first_name,
          username: credentialsAsNumber.username,
          photo_url: credentialsAsNumber.photo_url,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: TelegramUser }) {
      if (user) {
        token.id = user.id;
        token.first_name = user.first_name;
        token.username = user.username;
        token.photo_url = user.photo_url;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.first_name = token.first_name as string;
        session.user.username = token.username as string;
        session.user.photo_url = token.photo_url as string;
      }
      return session;
    },
  },
};

const auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default auth;
