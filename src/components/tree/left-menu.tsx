import React from "react";
import { Button } from "../ui/button";
import { BarChart2, Crown, Info } from "lucide-react";

export default function LeftTreeMenu() {
  return (
    <div className="absolute left-4 top-4 z-50 flex flex-col gap-2">
      <Button
        className="w-42 flex items-center justify-between gap-2 border-blue-500"
        variant="outline"
      >
        Info <Info size={16}></Info>
      </Button>
      <Button
        className="w-42 flex items-center justify-between gap-2 border-green-500"
        variant="outline"
      >
        Stats <BarChart2 size={16}></BarChart2>
      </Button>
      <Button
        className="w-42 flex items-center justify-between gap-2 border-yellow-500"
        variant="outline"
      >
        Leaderboard <Crown size={16}></Crown>
      </Button>
    </div>
  );
}
