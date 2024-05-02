"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function TelegramCommandWithExample({
  command,
  examples,
}: {
  command: string;
  examples: string[];
}) {
  const splitString = command.split(" ");
  const keyword = splitString[0];
  const args = " " + splitString.slice(1).join(" ");
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row px-4 py-2 bg-muted rounded-md">
          <div className="flex flex-row">
            <pre className={`text-blue-500 ${inter.className}`}>{keyword}</pre>
            <pre className={`text-wrap ${inter.className}`}>{args}</pre>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-4 flex flex-col mt-4 gap-4">
          {examples.map((example) => (
            <div
              key={example}
              className="px-4 py-2 flex flex-row bg-muted rounded-md text-base justify-between"
            >
              <div className="flex flex-row">
                <pre className={`text-blue-500 ${inter.className}`}>
                  {example.split(" ")[0]}
                </pre>
                <pre className={`text-wrap ${inter.className}`}>
                  {" " + example.split(" ").slice(1).join(" ")}
                </pre>
              </div>
              <div className="uppercase text-green-500">Example</div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
