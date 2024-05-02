"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function ContentTable() {
  function scrollIntoView(id: string) {
    console.log("scrooll");
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return (
    <div className="flex flex-col flex-grow px-10 border border-input p-8 rounded-md">
      <div className="text-2xl font-bold">Table of contents</div>
      <Separator className="my-4"></Separator>
      <Button
        onClick={() => scrollIntoView("Queues")}
        className="w-full justify-start"
        variant="ghost"
      >
        Queues
      </Button>
      <Button
        onClick={() => scrollIntoView("Rating")}
        className="w-full justify-start"
        variant="ghost"
      >
        Rating
      </Button>
      <Button
        onClick={() => scrollIntoView("Timetable")}
        className="w-full justify-start"
        variant="ghost"
      >
        Timetable
      </Button>
      <Button
        onClick={() => scrollIntoView("Tasks")}
        className="w-full justify-start"
        variant="ghost"
      >
        Tasks
      </Button>
      <Button
        onClick={() => scrollIntoView("Arguments")}
        className="w-full justify-start"
        variant="ghost"
      >
        Arguments
      </Button>
    </div>
  );
}
