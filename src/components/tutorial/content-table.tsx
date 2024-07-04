"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function ContentTable({ content }: { content: string[] }) {
  function scrollIntoView(id: string) {
    console.log("scrooll");
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return (
    <div className="flex flex-grow flex-col rounded-md border border-input p-8 px-10">
      <div className="text-2xl font-bold">Table of contents</div>
      <Separator className="my-4"></Separator>
      {content.map((item) => (
        <Button
          key={item}
          onClick={() => scrollIntoView(item)}
          className="w-full justify-start"
          variant="ghost"
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
