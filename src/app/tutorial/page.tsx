import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ContentTable from "./content-table";
import TelegramCommand from "./telegram-command";
import TelegramCommandWithExample from "./telegram-example-command";

export default function TutorialPage() {
  return (
    <div className="md:container mt-6">
      <Card className="w-full shadow-md lg:shadow-lg h-auto">
        <CardHeader>
          <CardTitle>How to use Lumios Bot?</CardTitle>
        </CardHeader>
        <CardBody className="w-full flex flex-col gap-6 rounded-lg p-4 md:p-8 h-auto">
          <div className="flex flex-row justify-center gap-10 flex-wrap md:flex-nowrap">
            <ContentTable></ContentTable>
            <div className="hidden md:flex flex-col flex-grow rounded-md aspect-auto overflow-hidden min-w-60 relative">
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
          <section id="Queues" className="w-full flex flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Queues</div>
            <TelegramCommandWithExample
              command="/queue <Назва> - Створити чергу із заданою назвою"
              examples={["/queue Lab Work №1", "/queue Lab1"]}
            />
            <TelegramCommandWithExample
              command="/mixed <Назва> - Створити мішану чергу із заданою назвою"
              examples={["/mixed Lab Work №2", "/mixed Lab2"]}
            />
            <div className="pl-4">
              Подальша взаємодія із чергами реалізується натисканням відповідних
              кнопок під повідомленням від боту:
              <ul>
                <li>- Join 🔰 - Доєднатися у кінець черги</li>
                <li>
                  - I&#39;m done ✅ - Вийти з черги, і сповістити наступного
                </li>
                <li>- Leave 🔄 - Вийти не з голови черги, без сповіщення</li>
                <li>- Delete ❌ - Видалити чергу, лише для адміністраторів</li>
                <li>- Notify ⚠ - Сповістити голову черги про його позицію</li>
                <li>- Shuffle 🔀 - Перемішати чергу у випадковому порядку</li>
              </ul>
            </div>
          </section>
          <Separator></Separator>
          <section id="Rating" className="w-full flex flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Rating</div>
            <TelegramCommand command="/stats - Переглянути загальну статистику поваги в цьому чаті" />
            <TelegramCommand command="/me - Переглянути власну статистику поваги в цьому чаті" />
            <TelegramCommand command="/shop - Збільшити щоденний ліміт кредитів" />
            <div className="pl-4">
              Повага змінюється завдяки реакціям на повідомлення інших
              користувачів, кожна реакція має своє додатнє або від&#39;ємне
              значення поваги. Підтримуються майже всі звичайні реакції в
              телеграмі.
            </div>
          </section>
          <Separator></Separator>
          <section id="Timetable" className="w-full flex flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Timetable</div>
            <TelegramCommand command="/feed - Згенерувати посилання на веб-редактор" />
            <TelegramCommand command="/today - Подивитися розклад на сьогодні" />
            <TelegramCommand command="/week - Подивитися розклад на тиждень" />
          </section>
          <Separator></Separator>
          <section id="Tasks" className="w-full flex flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Tasks</div>
            <TelegramCommandWithExample
              command="/task [dd.mm.year] [HH:mm] [Назва] <Посилання> - Створити"
              examples={[
                "/task 31.10.2024 10:00 MyTask",
                "/task 31.10.2024 12:00 AnotherTask https://link/to/task.com",
              ]}
            />
            <TelegramCommandWithExample
              command="/edit [ID] [dd.mm.year] [HH:mm] [Назва] <Посилання> - Редагувати"
              examples={[
                "/edit 23 31.10.2024 11:00 MyUpdatedTask",
                "/edit 18 31.10.2024 13:00 AnotherTask https://updatedLink/to/task.com",
              ]}
            />
            <TelegramCommand command="/due- Список усіх завдань" />
          </section>
          <Separator></Separator>
          <section id="Arguments" className="w-full flex flex-col gap-4">
            <div className="pl-4 text-xl font-bold">Arguments</div>
            <div className="pl-4">
              {
                "<Аргумент> і [Аргумент] відрізняються. В чому різниця? [Аргумент] є обов'язковим, <Аргумент>  - ні"
              }
            </div>
          </section>
        </CardBody>
      </Card>
    </div>
  );
}
