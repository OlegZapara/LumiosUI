import {
  CREATE_QUEUE,
  DELETE_MIXED_QUEUE,
  DELETE_SIMPLE_QUEUE,
  GET_QUEUES,
  UPDATE_QUEUE,
} from "@/shared/endpoints";
import { NextRequest, NextResponse } from "next/server";

function getChatId(req: NextRequest): string {
  const chatId = req.nextUrl.searchParams.get("chatId");
  if (chatId == null) {
    throw new Error("Request should contain chatId");
  }
  return chatId;
}

function getQueueId(req: NextRequest): string {
  const taskId = req.nextUrl.searchParams.get("queueId");
  if (taskId == null) {
    throw new Error("Request should contain queueId");
  }
  return taskId;
}

function getApiKey() {
  const apiKey = process.env.X_API_KEY;
  if (!apiKey) {
    throw new Error("Api key is missing");
  }
  return apiKey;
}

export async function GET(req: NextRequest) {
  const apiResponse = await fetch(GET_QUEUES, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      chatId: getChatId(req),
      "X-API-KEY": getApiKey(),
    },
  });
  if (!apiResponse.ok) {
    return new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
    });
  }
  let data;
  try {
    data = await apiResponse.json();
  } catch (error) {
    data = [];
  }
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const apiResponse = await fetch(UPDATE_QUEUE, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      chatId: getChatId(req),
      "X-API-KEY": getApiKey(),
    },
    body: JSON.stringify(await req.json()),
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}

export async function POST(req: NextRequest) {
  const apiResponse = await fetch(CREATE_QUEUE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      chatId: getChatId(req),
      "X-API-KEY": getApiKey(),
    },
    body: JSON.stringify(await req.json()),
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}

export async function DELETE(req: NextRequest) {
  const queueId = getQueueId(req);
  const isMixed = req.nextUrl.searchParams.get("isMixed") == "true";
  const fethcUrl = isMixed
    ? DELETE_MIXED_QUEUE(queueId)
    : DELETE_SIMPLE_QUEUE(queueId);
  console.log(fethcUrl);
  const apiResponse = await fetch(fethcUrl, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      chatId: getChatId(req),
      "X-API-KEY": getApiKey(),
    },
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}
