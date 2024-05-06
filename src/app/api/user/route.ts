import { GET_USER } from "@/shared/endpoints";
import { NextRequest, NextResponse } from "next/server";

function getApiKey() {
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  return apiKey;
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const apiResponse = await fetch(GET_USER(userId!), {
    headers: {
      "content-type": "application/json",
      "X-API-KEY": getApiKey(),
    },
  });
  console.log(apiResponse);
  if (!apiResponse.ok) {
    return new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
    });
  }
  const data = await apiResponse.json();
  return NextResponse.json(data);
}
