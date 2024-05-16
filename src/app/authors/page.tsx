"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { StickyScroll } from "@/components/ui/sticky-scroll";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
} from "@tabler/icons-react";

function OlehCard() {
  return (
    <PersonInfo3dCard
      name={"Oleh Zapara"}
      imageUrl="/me.png"
      description={
        <div>
          <span className="font-bold">Position</span>: Fullstack{" "}
          <span className="px-2 py-0.5 font-bold rounded-lg text-white bg-yellow-400">
            JavaScript
          </span>{" "}
          Developer
        </div>
      }
      github="https://github.com/OlegZapara"
      linkedin="https://www.linkedin.com/in/oleg-zapara-320a95248/"
      telegram="https://t.me/olehzpr"
    />
  );
}
function BogdanCard() {
  return (
    <PersonInfo3dCard
      name={"Bogdan Horokh"}
      imageUrl="/Bogdan.jpg"
      description={
        <div>
          <span className="font-bold">Position</span>: Back-end{" "}
          <span className="px-2 py-0.5 font-bold rounded-lg text-white bg-orange-800">
            Java
          </span>{" "}
          Developer / Engineer
        </div>
      }
      github="https://github.com/ikeepcalm"
      linkedin="https://www.linkedin.com/in/horokh-bohdan/"
      telegram="https://t.me/ikeepcalm"
    />
  );
}

const content = [
  {
    title: "Oleh Zapara",
    description: "",
    content: <OlehCard />,
  },
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: <OlehCard />,
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: <OlehCard />,
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: <OlehCard />,
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: <OlehCard />,
  },
  {
    title: "Horokh Bogdan",
    description: "",
    content: <BogdanCard />,
  },
  {
    title: "About Horokh Bogdan",
    description:
      "Active Minecraft developer, also interested in creating Telegram bots and any kind of backend applications if is motivated enough. Feel free to contact me anytime if you think I'd be interested!",
    content: <BogdanCard />,
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: <BogdanCard />,
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: <BogdanCard />,
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: <BogdanCard />,
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="">
      <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}

interface PersonInfoProps {
  name: string;
  imageUrl: string;
  description: React.ReactNode;
  github: string;
  linkedin: string;
  telegram: string;
}

function PersonInfo3dCard(props: PersonInfoProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {props.name}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={props.imageUrl}
            height="1000"
            width="1000"
            className="h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={props.name + " image"}
          />
        </CardItem>
        <div className="flex flex-col items-start mt-10">
          <CardItem
            translateZ={60}
            as="div"
            className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
          >
            {props.description}
          </CardItem>
          <CardItem
            translateZ={60}
            as="div"
            className="px-4 py-2 rounded-xl text-m font-normal flex flex-row gap-2"
          >
            <Link
              href={props.github}
              className="flex flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              Github
              <IconBrandGithub className="stroke-white bg-black rounded-full h-10 w-10 p-2"></IconBrandGithub>
            </Link>
            <Link
              href={props.linkedin}
              className="flex flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              LinkedIn
              <IconBrandLinkedin className="stroke-white bg-blue-600 rounded-full h-10 w-10 p-2"></IconBrandLinkedin>
            </Link>
            <Link
              href={props.telegram}
              className="flex flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              Telegram
              <IconBrandTelegram className="stroke-white bg-blue-400 rounded-full h-10 w-10 p-2"></IconBrandTelegram>
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
