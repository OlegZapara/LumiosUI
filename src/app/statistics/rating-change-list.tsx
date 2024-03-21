import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp, ChevronsUpDown, ChevronDown } from "lucide-react";
import React from "react";

interface RatingChangeListProps {
  data: { name: string; rating: number }[];
}

export default function RatingChangeList({
  data: changeList,
}: RatingChangeListProps) {
  function getIconForImprovement(improvement: number) {
    if (improvement > 0) {
      return (
        <div className="flex flex-row justify-between w-16 gap-2">
          <ChevronUp className="stroke-green-500 scale-125"></ChevronUp>
          <div className="text-green-500 text-lg">{improvement}</div>
        </div>
      );
    } else if (improvement == 0) {
      return (
        <div className="flex flex-row justify-between w-16 gap-2">
          <ChevronsUpDown className="stroke-gray-500 scale-125"></ChevronsUpDown>
          <div className="text-gray-500 text-lg">{improvement}</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row justify-between w-16 gap-2">
          <ChevronDown className="stroke-red-500 scale-125"></ChevronDown>
          <div className="text-red-500 text-lg">{improvement}</div>
        </div>
      );
    }
  }
  return (
    <Card className="col-span-1 h-full">
      <CardHeader>
        <CardTitle>Weekly change</CardTitle>
      </CardHeader>
      <CardBody className="w-full m-4">
        <ScrollArea className="w-full h-full">
          {changeList
            .sort((a, b) => b.rating - a.rating)
            .map((data) => (
              <div
                key={data.name}
                className="w-full py-2 px-4 flex justify-start gap-4"
              >
                {getIconForImprovement(data.rating)}
                <div>{data.name}</div>
              </div>
            ))}
        </ScrollArea>
      </CardBody>
    </Card>
  );
}
