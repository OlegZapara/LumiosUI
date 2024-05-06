import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { VortexMainLoading, VortextMain } from "@/components/vortex-main";
import { BarChart3, Bell, CalendarCheck, Send, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const GridImage = (props: { img: string }) => (
  <div className="flex flex-1 justify-center relative w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br">
    <div className="w-full h-full relative">
      <Image
        src={props.img}
        fill
        objectFit="contain"
        alt="Create queues"
      ></Image>
    </div>
  </div>
);

const items = [
  {
    title: "Create queues",
    description: "Queues for managing student order in various situations",
    header: <GridImage img="/Queues1.jpg"></GridImage>,
    icon: <Users className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Notify about special events",
    description: "Automatic notifications about start of the lessons and tasks",
    header: <GridImage img="notify-title.svg"></GridImage>,
    icon: <Bell className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Plan tasks",
    description: "Create scheduled tasks with detailed information about event",
    header: <GridImage img="tasks-title.svg"></GridImage>,
    icon: <CalendarCheck className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Manage group rating and statistics",
    description:
      "Track each person's rating based on reactions. View advanced statistics of group activity",
    header: <GridImage img="rating-title.svg"></GridImage>,
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Write important messages",
    description: "Schedule messages for your group (coming soon)",
    header: <GridImage img="msg-title.svg"></GridImage>,
    icon: <Send className="h-4 w-4 text-neutral-500" />,
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-white dark:from-black dark:via-black to-background w-full">
      <Suspense fallback={<VortexMainLoading></VortexMainLoading>}>
        <VortextMain></VortextMain>
      </Suspense>
      <BentoGrid className="max-w-6xl mx-auto px-2">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={
              i === 0
                ? "md:col-span-3"
                : i === 2 || i == 3
                ? "md:col-span-2"
                : ""
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
}
