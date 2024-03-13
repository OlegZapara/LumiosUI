"use client"

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Queue from "./queue";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const queues = [
  "АСД-1",
  "Оксім",
  "АСД-3",
  "кпі",
  "КПІ",
  "к_п_і",
  "АСД-7",
  "asdfasdfsadf",
  "АСД-9",
]

export default function Queues() {
  const [data, setData] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<string[]>([])

  useEffect(() => {
    setData(queues);
    setFilteredData(queues);
  }, [])

  function filterData(filter: string){
    setFilteredData(data.filter(x => x.toLowerCase().includes(filter)))
  }

  return (
    <div className="container">
      <Card className="w-full shadow-md lg:shadow-lg h-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-6 flex-col md:flex-row w-full justify-between">
              <span>Queues</span>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground"></Search>
                <Input className="pl-8 font-normal w-80" placeholder="Search queue by name" onChange={(e) => filterData(e.target.value)}></Input>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody className="w-full justify-center gap-6 rounded-lg p-8 grid grid-cols-6 h-auto">
          <div className="col-span-6 grid gap-6 md:col-span-3 lg:col-span-2 w-full h-auto">
            {filteredData.filter((_, i) => i % 3 == 0).map(x => (
              <Queue key={x} title={x}></Queue>
            ))}
          </div>
          <div className="col-span-6 grid gap-6 md:col-span-3 lg:col-span-2 w-full h-auto">
            {filteredData.filter((_, i) => (i + 2) % 3 == 0).map(x => (
              <Queue key={x} title={x}></Queue>
            ))}
          </div>
          <div className="col-span-6 grid gap-6 md:col-span-3 lg:col-span-2 w-full h-auto">
            {filteredData.filter((_, i) => (i + 1) % 3 == 0).map(x => (
              <Queue key={x} title={x}></Queue>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
