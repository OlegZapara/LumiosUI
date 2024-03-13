"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GripVertical, LogOut, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

let data = [
  { name: "@olehzpr", rating: 3776 },
  { name: "@ikeepcalm", rating: 3451 },
  { name: "@deffkaaaaaa", rating: 2573 },
  { name: "@mariauapoland", rating: 2373 },
  { name: "@dskarpets", rating: 2373 },
  { name: "@CabianoFaruana", rating: 2040 },
  { name: "@Marshmallllows", rating: 2006 },
  { name: "@cyrylocar", rating: 1925 },
  { name: "@yarosirgend", rating: 1569 },
  { name: "@Bohdan_MI", rating: 1278 },
  { name: "@pupkakub", rating: 1265 },
  { name: "@lychkoalexander", rating: 1052 },
  { name: "@golova_le_silrade", rating: 1042 },
  { name: "@b1dess", rating: 969 },
  { name: "@kyryloloshka", rating: 969 },
  { name: "@InfiniteSnake", rating: 785 },
  { name: "@andremalille", rating: 573 },
  { name: "@darpfnis", rating: 446 },
  { name: "@DrozdyW", rating: 366 },
  { name: "@wiastia", rating: 318 },
  { name: "@o_o_n_n_0_0", rating: 242 },
  { name: "@Gustavanenado", rating: 180 },
  { name: "@ostrjul", rating: 65 },
  { name: "@vova_cod", rating: 65 },
  { name: "@Ro_moro", rating: 62 },
  { name: "@alphashk", rating: 52 },
  { name: "@brrevq", rating: 41 },
  { name: "@vckplsidh", rating: 25 },
  { name: "@exiade", rating: 15 },
  { name: "@Artychanal", rating: 5 },
  { name: "@haivop", rating: 0 },
  { name: "@DDDUUUCCCKKK", rating: 0 },
  { name: "@Deniaaaaa_a", rating: 0 },
];

interface QueueProps{
  title: string
}

export default function Queue(props: QueueProps) {

  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    setUsers(data.map(x => x.name).slice(0, Math.max(Math.floor(Math.random() * data.length), 10)))
  }, [])

  function removeUser(name: string){
    console.log(name + "is removed");
    setUsers(users.filter(user => user != name));
  }

  return (
    <Card className="flex justify-start [&>div]:w-full flex-col">
      <CardHeader>
        <CardTitle><div>{props.title}</div></CardTitle>
      </CardHeader>
      <CardBody className="h-auto p-6 flex flex-col gap-1">
        {users.map((user, i) => (
            <div
              key={user}
              className="group flex flex-row relative items-center justify-between h-8  border-transparent w-full"
            >
              <GripVertical
                className={`absolute hidden group-hover:flex cursor-move`}
              ></GripVertical>
              <div className="pl-8">{user}</div>
              <Button variant="ghost" className={`h-8 w-8 p-0 hidden group-hover:flex`}>
                <LogOut className="h-4 w-4 stroke-red-500" onClick={() => removeUser(user)}></LogOut>
              </Button>
            </div>
          ))}
      </CardBody>
    </Card>
  );
}
