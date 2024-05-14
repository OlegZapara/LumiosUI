"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AverageMessageAreaChart from "./avg-msg-area-chart";
import MessageBarChart from "./msg-bar-chart";
import MessageLineChart from "./msg-line-chart";
import MessagePieChart from "./msg-pie-chart";
import RatingChangeList from "./rating-change-list";
import RatingChart from "./rating-chart";

export default function Rating() {
  return (
    <div>
      <Card className="w-[calc(100% - 3rem)] md:mx-6 md:my-2">
        <CardHeader>
          <CardTitle>Statistics for IP-32</CardTitle>
        </CardHeader>
        <CardBody className="w-[calc(100%-2rem)] grid grid-cols-4 grid-rows-4 gap-4 mx-4 mb-4 h-full">
          <RatingChart></RatingChart>
          <RatingChangeList></RatingChangeList>
          <MessagePieChart></MessagePieChart>
          <MessageLineChart></MessageLineChart>
          <MessageBarChart></MessageBarChart>
          <AverageMessageAreaChart></AverageMessageAreaChart>
        </CardBody>
      </Card>
    </div>
  );
}
