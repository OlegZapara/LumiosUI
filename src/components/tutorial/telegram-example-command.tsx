"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InterFont } from "@/lib/fonts";

type TelegramCommandWithExampleProps = { command: string; examples: string[] };

export default function TelegramCommandWithExample({
  command,
  examples,
}: TelegramCommandWithExampleProps) {
  const splitString = command.split(" ");
  const keyword = splitString[0];
  const args = " " + splitString.slice(1).join(" ");
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row rounded-md bg-muted px-4 py-2">
          <div className="flex flex-row">
            <pre className={`text-blue-500 ${InterFont.className}`}>
              {keyword}
            </pre>
            <pre className={`text-wrap ${InterFont.className}`}>{args}</pre>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4 flex flex-col gap-4 pl-4">
          {examples.map((example) => (
            <div
              key={example}
              className="flex flex-row justify-between rounded-md bg-muted px-4 py-2 text-base"
            >
              <div className="flex flex-row">
                <pre className={`text-blue-500 ${InterFont.className}`}>
                  {example.split(" ")[0]}
                </pre>
                <pre className={`text-wrap ${InterFont.className}`}>
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
