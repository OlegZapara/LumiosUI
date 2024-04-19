import { DELETE_TASK, GET_TASKS, UPDATE_TASK } from "@/shared/endpoints";
import { NextRequest, NextResponse } from "next/server";

function getChatId(req: NextRequest): string {
  const chatId = req.nextUrl.searchParams.get("chatId");
  if (chatId == null) {
    throw new Error("Request should contain chatId");
  }
  return chatId;
}

function getTaskId(req: NextRequest): string {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (taskId == null) {
    throw new Error("Request should contain taskId");
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
  const apiResponse = await fetch(GET_TASKS, {
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
  return NextResponse.json(await apiResponse.json());
}

export async function PUT(req: NextRequest) {
  const apiResponse = await fetch(UPDATE_TASK, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      chatId: getChatId(req),
      taskId: getTaskId(req),
      "X-API-KEY": getApiKey(),
    },
    body: JSON.stringify(await req.json()),
  });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
  });
}

export async function POST(req: NextRequest) {
  const apiResponse = await fetch(UPDATE_TASK, {
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
  const taskId = getTaskId(req);
  const apiResponse = await fetch(DELETE_TASK(taskId), {
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
