import { toast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { QueueContext } from "./queue";
import { GripVertical, UserRoundMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QueueUser } from "@/schemas/queue-schema";

export function UserItem({ user }: { user: QueueUser }) {
  const { isAdmin, users, setUsers } = useContext(QueueContext);
  const removeUser = (accountId: number) => {
    if (!isAdmin) {
      toast({ title: "Only admin can remove users" });
      return;
    }
    setUsers(users.filter((user) => user.accountId !== accountId));
  };
  return (
    <div className="group flex h-8 flex-row items-center justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <GripVertical size={16}></GripVertical>
        {user.username ? `@${user.username}` : user.name}
      </div>
      <Button
        variant="ghost"
        title="Remove user"
        onClick={() => removeUser(user.accountId)}
        className="hidden h-8 py-0 group-hover:flex"
      >
        <UserRoundMinus className="stroke-red-500" size={16}></UserRoundMinus>
        <span className="ml-2 hidden text-red-500 md:flex">Remove</span>
      </Button>
    </div>
  );
}
