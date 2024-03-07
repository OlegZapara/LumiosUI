"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
 

export default function Authors() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-10">
      <div className="flex flex-row w-full items-center justify-center gap-20">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Zapara Oleh
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/me.jpg"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex flex-col items-start mt-10">
            <CardItem
              translateZ={40}
              as="div"
              className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae assumenda pariatur libero amet nulla distinctio dolorum aliquid non illo.
            </CardItem>
            <CardItem
              translateZ={60}
              as="div"
              className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
            >
              Phone number: 123-123-1234
            </CardItem>
            <CardItem
              translateZ={60}
              as="div"
              className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
            >
              GitHub: <a href="https://github.com/OlegZapara">https://github.com/OlegZapara</a>
            </CardItem>
            <CardItem
              translateZ={60}
              as="div"
              className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
            >
              Telegram: @olehzpr
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
        <div className="flex w-96 h-full">      
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati et cum quibusdam corrupti sequi, nostrum voluptatibus expedita aspernatur, deserunt reiciendis officia? Officiis animi perspiciatis alias harum dolore quaerat provident, eius at, natus quis libero? Doloremque, qui. Molestiae dolorum repellat ducimus doloribus fuga possimus reiciendis corrupti, beatae quae eveniet assumenda quisquam nemo soluta. Dignissimos ducimus nobis suscipit a esse voluptatibus eum rerum, doloribus et ullam dolore provident dolorem nesciunt asperiores voluptatem tempore iusto cupiditate harum sit! Iste eos, eveniet hic nihil nam tenetur dolorem eum. Magni eveniet quos alias ullam amet corporis sed numquam, optio repellendus hic et similique non saepe.
        </div>
      </div>
      <div className="flex flex-row-reverse w-full items-center justify-center gap-20">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Horokh Bohdan
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/Bogdan.jpg"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex flex-col items-start mt-10">
            <CardItem
              translateZ={40}
              as="div"
              className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae assumenda pariatur libero amet nulla distinctio dolorum aliquid non illo.
            </CardItem>
            <CardItem
              translateZ={60}
              as="div"
              className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
            >
              Phone number: 123-123-1234
            </CardItem>
            <CardItem
              translateZ={60}
              as="div"
              className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
            >
              GitHub: https://github.com/ikeepcalm
            </CardItem>
            <CardItem
              translateZ={60}
              as="div"
              className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
            >
              Telegram: @ikeepcalm
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
        <div className="flex w-96 h-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aperiam consequuntur, deleniti praesentium animi ad voluptates nesciunt corrupti, aspernatur ex pariatur provident aut nam. Ut quidem eos ipsum? Temporibus aut suscipit impedit minus distinctio non blanditiis adipisci laboriosam, quam ad facere recusandae, nostrum earum deserunt assumenda, voluptatibus consectetur magnam quos neque dolore fugiat. Nobis, quidem voluptatum provident reiciendis aut, in nostrum dolore eligendi iusto ipsum alias aliquam amet tenetur necessitatibus! Facere, non sunt officia dolorum minus alias iste officiis iure consectetur unde, inventore maxime quam cum deserunt provident sit exercitationem! Soluta alias laborum porro rem, dolores harum enim nostrum similique?
        </div>
      </div>


    </div>
  )
}
