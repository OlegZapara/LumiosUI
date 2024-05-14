import { GET_MESSAGES, GET_RATING } from "@/shared/endpoints";
import { NextRequest, NextResponse } from "next/server";

function getApiKey() {
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  return apiKey;
}

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const apiResponse = await fetch(GET_MESSAGES(chatId!, startDate!, endDate!), {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": getApiKey(),
    },
  });
  if (!apiResponse.ok) {
    return new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
    });
  }
  return NextResponse.json(await apiResponse.json());
}
