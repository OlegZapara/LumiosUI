import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Image from "next/image";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const GridImage = (props: { img: string }) => (
  <div className="flex flex-1 justify-center relative w-full h-full py-2 lg:py-8 px-6 min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 dark:from-blue-900 dark:to-blue-950 to-blue-100">
    <div className="w-full h-full relative">
      <Image src={props.img} fill alt="Create queues"></Image>
    </div>
  </div>
);

const items = [
  {
    title: "Create queues",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <GridImage img="queues-title.svg"></GridImage>,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Notify about special events",
    description: "Dive into the transformative power of technology.",
    header: <GridImage img="notify-title.svg"></GridImage>,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Plan tasks",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <GridImage img="tasks-title.svg"></GridImage>,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Manage group rating",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <GridImage img="rating-title.svg"></GridImage>,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Write important messages",
    description: "Join the quest for understanding and enlightenment.",
    header: <GridImage img="msg-title.svg"></GridImage>,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <BentoGrid className="max-w-6xl mx-auto">
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
