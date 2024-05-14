import { GET_USER_PHOTO } from "@/shared/endpoints";
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
  const apiResponse = await fetch(GET_USER_PHOTO(userId!), {
    headers: {
      "X-API-KEY": getApiKey(),
    },
  });
  if (!apiResponse.ok) {
    return new NextResponse("Bad request", {
      status: apiResponse.status,
    });
  }

  const data = await apiResponse.blob();
  return new NextResponse(data);
}
