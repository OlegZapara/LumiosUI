import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { getChats, updateChatId } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import Filter from "@/components/general/filter";
import ChatList from "@/components/choose-chat/chat-list";

export default async function ChooseChatPage() {
  const chats = await getChats();

  if (chats.length == 0) {
    redirect("/");
  }
  if (chats.length == 1) {
    await updateChatId(chats[0].id);
    redirect("/");
  }

  return (
    <div className="mt-6 md:container">
      <Card className="h-auto w-full shadow-md lg:shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex w-full flex-col items-center justify-between gap-6 px-4 md:flex-row">
              <span className="mt-3 flex flex-col gap-1">
                Lumios Bot is available in multiple chats.
                <span className="flex flex-row items-center gap-2 text-base font-normal">
                  <MoveRight></MoveRight>Select chat that you want to use
                </span>
              </span>
              <Filter placeholder="Search for chats" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody className="grid h-auto w-full grid-cols-6 justify-center gap-6 rounded-lg p-4 md:p-8">
          <ChatList chats={chats} />
        </CardBody>
      </Card>
    </div>
  );
}
