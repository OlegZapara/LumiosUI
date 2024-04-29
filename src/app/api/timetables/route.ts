import {
  CREATE_TIMETABLE,
  DELETE_TIMETABLE,
  GET_TIMETABLE,
  UPDATE_TIMETABLE,
} from "@/shared/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");
  if (chatId == null) {
    return new NextResponse("Request should contain chatId", { status: 400 });
  }
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  const apiResponse = await fetch(GET_TIMETABLE, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      chatId: chatId,
      "X-API-KEY": apiKey,
    },
  });
  if (!apiResponse.ok) {
    return new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
    });
  }
  return NextResponse.json(await apiResponse.json());
}

export async function PUT(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");
  if (!chatId) {
    return new NextResponse("Request should contain chatId", { status: 400 });
  }
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  const apiResponse = await fetch(UPDATE_TIMETABLE, {
    method: "POST",
    headers: {
      chatId: chatId,
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(await req.json()),
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}

export async function POST(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");
  if (!chatId) {
    return new NextResponse("Request should contain chatId", { status: 400 });
  }
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  const apiResponse = await fetch(CREATE_TIMETABLE, {
    method: "POST",
    headers: {
      chatId: chatId,
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(await req.json()),
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}

export async function DELETE(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");
  if (!chatId) {
    return new NextResponse("Request should contain chatId", { status: 400 });
  }
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  const apiResponse = await fetch(DELETE_TIMETABLE, {
    method: "DELETE",
    headers: {
      chatId: chatId,
      "X-API-KEY": apiKey,
    },
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}
