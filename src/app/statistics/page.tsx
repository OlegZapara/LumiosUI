"use client";

import { data, dayMessageData, improvement, messageDataHardcoded } from "./data";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MessageLineChart from "./msg-line-chart";
import MessagePieChart from "./msg-pie-chart";
import RatingChangeList from "./rating-change-list";
import RatingChart from "./rating-chart";

const messageData = messageDataHardcoded.sort((a, b) => b.value - a.value).slice(0, 10);

export default function Rating() {

  return (
    <div>
      <Card className="w-[calc(100% - 3rem)] mx-6 my-2">
        <CardHeader>
          <CardTitle>Statistics for IP-32</CardTitle>
        </CardHeader>
        <CardBody className="w-[calc(100%-2rem)] grid grid-cols-4 gap-4 mx-4 mb-4 h-full">
          <RatingChart data={data}></RatingChart>
          <RatingChangeList data={improvement}></RatingChangeList>
          <MessagePieChart data={messageData}></MessagePieChart>
          <MessageLineChart data={dayMessageData}></MessageLineChart>
        </CardBody>
      </Card>
    </div>
  );
}
