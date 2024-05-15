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
      <div className="md:container mt-10 flex flex-col md:flex-row justify-center items-center w-full">
        <Card className="w-full md:w-2/3 md:px-10 md:mt-10 md:min-w-[800px]">
          <CardContent className="flex p-3 md:p-6 flex-col md:flex-row justify-center items-center w-full gap-4">
            <Image
              src="/cute-cat.jpg"
              alt="uWu cat"
              className="rounded-lg"
              height={400}
              width={300}
            ></Image>
            <div className="flex flex-col w-full justify-center items-center gap-4">
              <div className="flex text-nowrap px-5 text-lg bg-muted h-16 w-full relative rounded-tr-sm rounded-br-xl rounded-tl-xl rounded-bl-sm justify-center items-center">
                Enter secret herobrine phrase:
              </div>
              <div className="md:ml-10 relative group cursor-pointer w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <Input
                    value={value}
                    className="space-y-2 group-hover:ring-1 focus-visible:ring-blue-500 focus-visible:ring-1"
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
    <div className="flex justify-center items-center overflow-hidden h-[calc(100vh-4rem)]">
      <Image
        src="/herobrine.png"
        alt="Herobrine image"
        width={1000}
        height={1000}
        className="max-w-[1400px] left-0 right-0 h-full aspect-square"
      ></Image>
    </div>
  );
}
