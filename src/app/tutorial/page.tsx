import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ContentTable from "../../components/tutorial/content-table";
import TelegramCommand from "../../components/tutorial/telegram-command";
import TelegramCommandWithExample from "../../components/tutorial/telegram-example-command";

const content = ["Queues", "Rating", "Timetable", "Tasks", "Arguments"];

export default function TutorialPage() {
  return (
    <div className="mt-6 md:container">
      <Card className="h-auto w-full shadow-md lg:shadow-lg">
        <CardHeader>
          <CardTitle>How to use Lumios Bot?</CardTitle>
        </CardHeader>
        <CardBody className="flex h-auto w-full flex-col gap-6 rounded-lg p-4 md:p-8">
          <div className="flex flex-row flex-wrap justify-center gap-10 md:flex-nowrap">
            <ContentTable content={content} />
            <div className="relative hidden aspect-auto min-w-60 flex-grow flex-col overflow-hidden rounded-md md:flex">
              <div className="relavtive h-full w-full">
                <Image
                  className="h-full w-full object-cover"
                  alt="Lumios + Telegram"
                  src="/Image.webp"
                  layout="fill"
                  objectFit="cover"
                ></Image>
              </div>
            </div>
          </div>
          <section id="Queues" className="flex w-full flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Queues</div>
            <TelegramCommandWithExample
              command="/queue <Name> - Create new queue with given name"
              examples={["/queue Lab Work №1", "/queue Lab1", "/queue"]}
            />
            <TelegramCommandWithExample
              command="/mixed <Name> - Created new mixed queue with given name"
              examples={["/mixed Lab Work №2", "/mixed Lab2", "/mixed"]}
            />
            <div className="pl-4">
              Further interaction with the queues is implemented by pressing the
              appropriate buttons under the message from the bot:
              <ul>
                <li>- Join 🔰 - Join the end of the queue</li>
                <li>
                  - I&#39;m done ✅ - Leave the queue and notify the next person
                </li>
                <li>
                  - Leave 🔄 - Leave from the middle of the queue without
                  notification
                </li>
                <li>- Delete ❌ - Delete queue, for administrators only</li>
                <li>
                  - Notify ⚠ - Notify the head of the queue about his position
                </li>
                <li>
                  - Shuffle 🔀 - Shuffle the queue in random order, for
                  administrators only
                </li>
              </ul>
            </div>
          </section>
          <Separator></Separator>
          <section id="Rating" className="flex w-full flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Rating</div>
            <TelegramCommand command="/stats - View overall chat rating statistics" />
            <TelegramCommand command="/me - View your own rating stats in this chat" />
            <div className="pl-4">
              Rating changes through reactions to others&apos; messages users,
              each reaction has its positive or negative the meaning of rating.
              Almost all common telegram reactions are supported
            </div>
          </section>
          <Separator></Separator>
          <section id="Timetable" className="flex w-full flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Timetable</div>
            <TelegramCommand command="/editor - Get link to Lumios Bot website" />
            <TelegramCommand command="/today - View timetable for today" />
            <TelegramCommand command="/tomorrow - View timetable for tomorrow" />
            <TelegramCommand command="/week - View timetable for the week" />
            <TelegramCommand command="/now - Get link to the current lesson" />
            <TelegramCommand command="/next - Get link to the next lesson" />
          </section>
          <Separator></Separator>
          <section id="Tasks" className="flex w-full flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Tasks</div>
            <TelegramCommandWithExample
              command="/task [dd.mm.year] [HH:mm] [Name] <Посилання> - Create task"
              examples={[
                "/task 31.10.2024 10:00 MyTask",
                "/task 31.10.2024 12:00 AnotherTask https://link/to/task.com",
              ]}
            />
            <TelegramCommandWithExample
              command="/edit [ID] [dd.mm.year] [HH:mm] [Name] <Посилання> - Edit task"
              examples={[
                "/edit 23 31.10.2024 11:00 MyUpdatedTask",
                "/edit 18 31.10.2024 13:00 AnotherTask https://updatedLink/to/task.com",
              ]}
            />
            <TelegramCommand command="/due - List all tasks" />
          </section>
          <Separator></Separator>
          <section id="Arguments" className="flex w-full flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Arguments</div>
            <div className="pl-4">
              {
                "<Argument> and [Argument] are not the same. What is the difference? [Argument] is required, but <Argument> is not"
              }
            </div>
          </section>
        </CardBody>
      </Card>
    </div>
  );
}
