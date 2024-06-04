import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { verifyTelegramLogin } from "@/app/api/auth/[...nextauth]";

interface TelegramUser {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const userData: TelegramUser = req.body;

    const isValid = verifyTelegramLogin(userData);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid Telegram login data" });
    }

    const sessionToken = await getToken({ req });
    if (!sessionToken) {
      return res.status(401).json({ error: "Unable to create session" });
    }

    const updatedToken = {
      ...sessionToken,
      id: userData.id.toString(),
      first_name: userData.first_name,
      username: userData.username,
      photo_url: userData.photo_url,
    };

    res.status(200).json({ success: true, token: updatedToken });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
