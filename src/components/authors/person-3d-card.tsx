import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
} from "@tabler/icons-react";
import Link from "next/link";

interface PersonInfoProps {
  name: string;
  imageUrl: string;
  description: React.ReactNode;
  github: string;
  linkedin: string;
  telegram: string;
}

export function PersonInfo3dCard(props: PersonInfoProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {props.name}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={props.imageUrl}
            height="1000"
            width="1000"
            className="h-72 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt={props.name + " image"}
          />
        </CardItem>
        <div className="mt-10 flex flex-col items-start">
          <CardItem
            translateZ={60}
            as="div"
            className="text-m rounded-xl px-4 py-2 font-normal dark:text-white"
          >
            {props.description}
          </CardItem>
          <CardItem
            translateZ={60}
            as="div"
            className="text-m flex flex-row gap-2 rounded-xl px-4 py-2 font-normal"
          >
            <Link
              href={props.github}
              className="flex flex-row items-center justify-center gap-2 rounded-lg border border-input bg-muted px-2 py-1 font-bold"
            >
              Github
              <IconBrandGithub className="h-10 w-10 rounded-full bg-black stroke-white p-2"></IconBrandGithub>
            </Link>
            <Link
              href={props.linkedin}
              className="flex flex-row items-center justify-center gap-2 rounded-lg border border-input bg-muted px-2 py-1 font-bold"
            >
              LinkedIn
              <IconBrandLinkedin className="h-10 w-10 rounded-full bg-blue-600 stroke-white p-2"></IconBrandLinkedin>
            </Link>
            <Link
              href={props.telegram}
              className="flex flex-row items-center justify-center gap-2 rounded-lg border border-input bg-muted px-2 py-1 font-bold"
            >
              Telegram
              <IconBrandTelegram className="h-10 w-10 rounded-full bg-blue-400 stroke-white p-2"></IconBrandTelegram>
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
