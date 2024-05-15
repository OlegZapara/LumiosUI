"use client";
import { Users, Bell, CalendarCheck, BarChart3, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { useTheme } from "next-themes";

const GridImage = (props: { img: string }) => (
  <div className="flex flex-1 justify-center relative w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br">
    <div className="w-full h-full relative">
      <Image
        src={props.img}
        fill
        style={{ objectFit: "contain" }}
        alt="Create queues"
      ></Image>
    </div>
  </div>
);

export default function MainBentoGrid() {
  const theme = useTheme();
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    if (!theme.resolvedTheme) return;
    setCurrentTheme(theme.resolvedTheme);
  }, [theme.resolvedTheme]);

  const items = [
    {
      title: "Create queues",
      description: "Queues for managing student order in various situations",
      header: <GridImage img={`/queues-${currentTheme}.jpg`}></GridImage>,
      icon: <Users className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Notify about special events",
      description:
        "Automatic notifications about start of the lessons and tasks",
      header: <GridImage img={`/events-${currentTheme}.jpg`}></GridImage>,
      icon: <Bell className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Plan tasks",
      description:
        "Create scheduled tasks with detailed information about event",
      header: <GridImage img={`/tasks-${currentTheme}.jpg`}></GridImage>,
      icon: <CalendarCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Manage group rating and statistics",
      description:
        "Track each person's rating based on reactions. View advanced statistics of group activity",
      header: <GridImage img={`/rating-${currentTheme}.jpg`}></GridImage>,
      icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Write important messages",
      description: "Schedule messages for your group (coming soon)",
      header: <GridImage img={`/messages-${currentTheme}.jpg`}></GridImage>,
      icon: <Send className="h-4 w-4 text-neutral-500" />,
    },
  ];
  return (
    <BentoGrid className="max-w-6xl mx-auto px-2">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={
            i === 0 ? "md:col-span-3" : i === 2 || i == 3 ? "md:col-span-2" : ""
          }
        />
      ))}
    </BentoGrid>
  );
}
