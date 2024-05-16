"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { notFound } from "next/navigation";
import AverageMessageAreaChart from "./avg-msg-area-chart";
import MessageBarChart from "./msg-bar-chart";
import MessageLineChart from "./msg-line-chart";
import MessagePieChart from "./msg-pie-chart";
import RatingChangeList from "./rating-change-list";
import RatingChart from "./rating-chart";
import { useEffect } from "react";

export default function Statistics() {
  const authenticated = useAuth();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  if (authenticated == null) return null;
  if (!authenticated) return notFound();
  return (
    <div>
      <Card className="w-[calc(100% - 3rem)] md:mx-6 md:my-2">
        <CardHeader>
          <CardTitle>Statistics for IP-32</CardTitle>
        </CardHeader>
        <CardContent className="md:w-[calc(100%-2rem)] grid grid-cols-4 grid-rows-4 gap-4 md:mx-4 md:mb-4 h-full p-1 md:p-6 w-full">
          <RatingChart></RatingChart>
          <RatingChangeList></RatingChangeList>
          <MessagePieChart></MessagePieChart>
          <MessageLineChart></MessageLineChart>
          <MessageBarChart></MessageBarChart>
          <AverageMessageAreaChart></AverageMessageAreaChart>
        </CardContent>
      </Card>
    </div>
  );
}
