"use client";

import { averageWeekResults, data, dayMessageData, improvement, messageDataHardcoded, weekMessageData } from "./data";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MessageLineChart from "./msg-line-chart";
import MessagePieChart from "./msg-pie-chart";
import RatingChangeList from "./rating-change-list";
import RatingChart from "./rating-chart";
import MessageBarChart from "./msg-bar-chart";
import AverageMessageAreaChart from "./avg-msg-area-chart";

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
          <MessageBarChart data={weekMessageData}></MessageBarChart>
          <AverageMessageAreaChart data={averageWeekResults}></AverageMessageAreaChart>
        </CardBody>
      </Card>
    </div>
  );
}
