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
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
          and{" "}
          <span className="px-1.5 py-0.5 font-bold rounded-lg text-white bg-green-700">
            C#
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
function BohdanCard() {
  return (
    <PersonInfo3dCard
      name={"Bohdan Horokh"}
      imageUrl="/Bohdan.jpg"
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
    title: "About Oleh Zapara",
    description:
      "Oleh Zapara a fullstack developer mainly working with Javascript and C#, and focused is mainly in the web technology field.",
    content: <OlehCard />,
  },
  {
    title: "Education",
    description:
      "Oleh is currently studying Software Engineering at Kyiv Polytechnic Institute, where he combines theoretical knowledge with hands-on projects to valuable and useful software.",
    content: <OlehCard />,
  },
  {
    title: "Projects",
    description:
      "Oleh created various projects, including this website, custom presentation website for competing in GENIUS Olympiad, and some small websites for local business. Also he created various APIs that provide useful information for other services. (To see projects visit GitHub page)",
    content: <OlehCard />,
  },
  {
    title: "Contact",
    description:
      "Oleh is looking for advancing in field of computer programming and actively seek opportunities to connect with professionals and enthusiasts on platforms like GitHub and LinkedIn to collaborate on transformative projects in web development.",
    content: <OlehCard />,
  },
  {
    title: "Bohdan Horokh",
    description: "",
    content: <BohdanCard />,
  },
  {
    title: "About Bohdan Horokh",
    description:
      "An active Minecraft developer with a keen interest in creating Telegram bots and backend applications, driven by passion and motivation to explore new possibilities in coding.",
    content: <BohdanCard />,
  },
  {
    title: "Education",
    description:
      "Currently studying at Kyiv Polytechnic Institute in Ukraine and Lower Danube University in Romania, Bohdan is dedicated to advancing my knowledge in computer science and software engineering.",
    content: <BohdanCard />,
  },
  {
    title: "Roles and Projects",
    description:
      "Within the Minecraft community, Bohdan leads development at UAProject Minecraft Server and contributed to the backend of the Lumios bot, showcasing my commitment to innovative gaming and bot development.",
    content: <BohdanCard />,
  },
  {
    title: "Contact",
    description:
      "Bohdan is looking to become a qualified developer, and invites you to explore his GitHub for more details on my projects. Feel free to contact him anytime for potential collaborations or discussions on shared interests!",
    content: <BohdanCard />,
  },
  {
    title: "",
    description: "",
    content: <BohdanCard />,
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="">
      <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
        <StickyScroll content={content} />
      </div>
      <div className="md:hidden w-full flex justify-center items-center flex-col px-1 mb-5 gap-4">
        <Card className="w-full pt-4 max-w-xl">
          <CardTitle className="w-full text-center space-y-3">
            Contact Bohdan Horokh
          </CardTitle>
          <CardContent className="flex flex-row items-center justify-start gap-5 flex-wrap my-4">
            <Link
              href={"https://github.com/ikeepcalm"}
              className="flex flex-grow flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              Github
              <IconBrandGithub className="stroke-white bg-black rounded-full h-10 w-10 p-2"></IconBrandGithub>
            </Link>
            <Link
              href={"https://www.linkedin.com/in/horokh-bohdan/"}
              className="flex flex-grow flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              LinkedIn
              <IconBrandLinkedin className="stroke-white bg-blue-600 rounded-full h-10 w-10 p-2"></IconBrandLinkedin>
            </Link>
            <Link
              href={"https://t.me/ikeepcalm"}
              className="flex flex-grow flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              Telegram
              <IconBrandTelegram className="stroke-white bg-blue-400 rounded-full h-10 w-10 p-2"></IconBrandTelegram>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full pt-4 max-w-xl">
          <CardTitle className="w-full text-center space-y-3">
            Contact Oleh Zapara
          </CardTitle>
          <CardContent className="flex flex-row items-center justify-start gap-5 flex-wrap my-4">
            <Link
              href={"https://github.com/OlegZapara"}
              className="flex flex-grow flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              Github
              <IconBrandGithub className="stroke-white bg-black rounded-full h-10 w-10 p-2"></IconBrandGithub>
            </Link>
            <Link
              href={"https://www.linkedin.com/in/oleg-zapara-320a95248/"}
              className="flex flex-grow flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              LinkedIn
              <IconBrandLinkedin className="stroke-white bg-blue-600 rounded-full h-10 w-10 p-2"></IconBrandLinkedin>
            </Link>
            <Link
              href={"https://t.me/olehzpr"}
              className="flex flex-grow flex-row gap-2 justify-center items-center font-bold bg-muted border-input px-2 py-1 rounded-lg border"
            >
              Telegram
              <IconBrandTelegram className="stroke-white bg-blue-400 rounded-full h-10 w-10 p-2"></IconBrandTelegram>
            </Link>
          </CardContent>
        </Card>
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
