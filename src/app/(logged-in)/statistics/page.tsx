import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RatingChart from "@/components/statistics/rating-chart";
import RatingChangeList from "@/components/statistics/rating-change-list";
import MessagePieChart from "@/components/statistics/msg-pie-chart";
import MessageLineChart from "@/components/statistics/msg-line-chart";
import MessageBarChart from "@/components/statistics/msg-bar-chart";
import AverageMessageAreaChart from "@/components/statistics/avg-msg-area-chart";
import { getSession } from "@/actions/auth-actions";

export default async function Statistics() {
  return (
    <div>
      <Card className="w-[calc(100% - 3rem)] md:mx-6 md:my-2">
        <CardHeader>
          <CardTitle>Statistics for current group</CardTitle>
        </CardHeader>
        <CardContent className="grid h-full w-full grid-cols-4 grid-rows-4 gap-4 p-1 md:mx-4 md:mb-4 md:w-[calc(100%-2rem)] md:p-6">
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
