import { NextRequest, NextResponse } from "next/server";
import { SHUFFLE_QUEUE } from "@/shared/endpoints";

function getApiKey() {
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  return apiKey;
}

export async function POST(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId")!;
  const queueId = req.nextUrl.searchParams.get("queueId")!;
  const apiResponse = await fetch(SHUFFLE_QUEUE(queueId), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      chatId: chatId,
      "X-API-KEY": getApiKey(),
    },
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}
