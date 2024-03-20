"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpToLine, LogOut, Pin, PinOff, Shuffle, Trash2 } from "lucide-react";
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
  const [users, setUsers] = useState<{users: string[], undo: string[]}>({
    users: [],
    undo: []
  })
  const [isPinned, setIsPinned] = useState<boolean>(false)
  const { toast } = useToast();

  useEffect(() => {
    const usersData = data.map(x => x.name).slice(0, Math.max(Math.floor(Math.random() * data.length), 10))
    setUsers({
      users: usersData,
      undo: usersData,
    })
  }, [])

  function removeUser(name: string){
    console.log(name + "is removed");
    setUsers({
      users: users.users.filter(user => user != name),
      undo: users.users
    })
    toast({
      title: props.title,
      description: name + " was removed from queue",
      duration: 3000,
      action: (
        <ToastAction altText="Undo deletion" onClick={() => undo()}>Undo</ToastAction>
      )
    });
  }

  function moveUp(name: string){
    setUsers({
      users: [name, ...users.users.filter(user => user != name)],
      undo: users.users
    })
    toast({
      title: props.title,
      description: name + " is now first in the queue",
      duration: 3000,
      action: (
        <ToastAction altText="Undo moving up" onClick={() => undo()}>Undo</ToastAction>
      )
    });
  }

  function undo(){
    setUsers({
      users: users.users,
      undo: users.users
    })
  }

  function shuffle(){
    toast({
      title: props.title + " was shuffled successfully",
      action: (
        <Shuffle className="stroke-green-500"></Shuffle>
      ),
      duration: 3000,
    });
  }

  function deleteQueue(){
    toast({
      title: props.title + " was deleted successfully",
      action: (
        <Trash2 className="stroke-green-500"></Trash2>
      ),
      duration: 3000,
    });
  }

  return (
    <Card className="flex justify-start [&>div]:w-full flex-col">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <div className="pl-4">{props.title}</div>
          <div>
            <Button variant="ghost" title="Shuffle queue" onClick={() => shuffle()}>
              <Shuffle className="stroke-blue-500"></Shuffle>
            </Button>
            <Button variant="ghost" title={isPinned? "Unpin queue" : "Pin queue"} onClick={() => setIsPinned(p => !p)}>
              {isPinned? <PinOff className="stroke-orange-300"></PinOff> : <Pin className="stroke-orange-300"></Pin>}
            </Button>
            <Button variant="ghost" title="Remove queue" onClick={() => deleteQueue()}>
              <Trash2 className="stroke-red-500"></Trash2>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody className="h-auto p-6 flex flex-col gap-1">
        {users.users.map((user, i) => (
            <div
              key={user}
              className="group flex flex-row relative items-center justify-between h-8  border-transparent w-full"
            >
              <Button onClick={() => moveUp(user)} variant="ghost" className={`h-8 w-8 p-0 absolute hidden group-hover:flex`} aria-label="Move to start" title="Move to start">
                <ArrowUpToLine className="h-4 w-4 stroke-green-500"></ArrowUpToLine>
              </Button>
              <div className="pl-10">{i + 1}. {user}</div>
              <Button onClick={() => removeUser(user)} variant="ghost" className={`h-8 w-8 p-0 hidden group-hover:flex`} aria-label="Remove user" title="Remove user">
                <LogOut className="h-4 w-4 stroke-red-500"></LogOut>
              </Button>
            </div>
          ))}
      </CardBody>
    </Card>
  );
}
