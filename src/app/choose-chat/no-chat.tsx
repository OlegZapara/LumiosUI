import React from "react";
import { data } from "./instruction";
import { Separator } from "@/components/ui/separator";

export default function NoChat() {
  return (
    <div className="container max-w-[1200px] mt-6">
      <div className="flex flex-row items-end gap-2 text-2xl flex-wrap">
        <div className="text-2xl">
          You have no chats associated with Lumios Bot.
        </div>
        <div className="text-blue-500">How to add Bot to my chat?</div>
      </div>
      <section className="flex flex-col gap-4 mt-6 mb-10">
        <div className="text-xl sm:text-3xl py-2 px-3 bg-muted rounded-md">
          IOS
        </div>
        <div className="flex flex-col gap-1">
          {data.IOS.map((x, i) => (
            <div key={x}>
              <span className="text-blue-500 font-bold">{i + 1}.</span> {x}
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-6 mb-10">
        <div className="text-xl sm:text-3xl py-2 px-3 bg-muted rounded-md">
          Android
        </div>
        <div className="flex flex-col gap-1">
          {data.ANDROID.map((x, i) => (
            <div key={x}>
              <span className="text-blue-500 font-bold">{i + 1}.</span> {x}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 mt-6 mb-10">
        <div className="text-xl sm:text-3xl py-2 px-3 bg-muted rounded-md">
          Mac Desktop
        </div>
        <div className="flex flex-col gap-1">
          {data.MAC.map((x, i) => (
            <div key={x}>
              <span className="text-blue-500 font-bold">{i + 1}.</span> {x}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 mt-6 mb-10">
        <div className="text-xl sm:text-3xl py-2 px-3 bg-muted rounded-md">
          Windows Desktop
        </div>
        <div className="flex flex-col gap-1">
          {data.WINDOWS.map((x, i) => (
            <div key={x}>
              <span className="text-blue-500 font-bold">{i + 1}.</span> {x}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
