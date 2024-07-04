"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useState } from "react";

export default function HerobrinePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const secret = "Ухилянт";

  const submitSecret = () => {
    if (value == secret) {
      toast({ title: "You entered herobrine mode", duration: 2000 });
      setAuthenticated(true);
    } else toast({ title: "Wrong secret" });
  };

  if (!authenticated) {
    return (
      <div className="mt-10 flex w-full flex-col items-center justify-center md:container md:flex-row">
        <Card className="w-full md:mt-10 md:w-2/3 md:min-w-[800px] md:px-10">
          <CardContent className="flex w-full flex-col items-center justify-center gap-4 p-3 md:flex-row md:p-6">
            <Image
              src="/cute-cat.jpg"
              alt="uWu cat"
              className="rounded-lg"
              height={400}
              width={300}
            ></Image>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="relative flex h-16 w-full items-center justify-center text-nowrap rounded-bl-sm rounded-br-xl rounded-tl-xl rounded-tr-sm bg-muted px-5 text-lg">
                Enter secret herobrine phrase:
              </div>
              <div className="group relative w-full cursor-pointer md:ml-10">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-600 to-violet-600 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="items-top relative flex justify-start space-x-6 rounded-lg leading-none ring-1 ring-gray-900/5">
                  <Input
                    value={value}
                    className="space-y-2 focus-visible:ring-1 focus-visible:ring-blue-500 group-hover:ring-1"
                    onChange={(e) => setValue(e.target.value)}
                  ></Input>
                </div>
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="w-full md:ml-10"
                onClick={submitSecret}
              >
                Sumbit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <Image
        src="/herobrine.png"
        alt="Herobrine image"
        width={1000}
        height={1000}
        className="left-0 right-0 aspect-square h-full max-w-[1400px]"
      ></Image>
    </div>
  );
}
