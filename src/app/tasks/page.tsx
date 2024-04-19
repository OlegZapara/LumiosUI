"use client";

import useSettings from "@/hooks/useSettings";
import { useEffect, useState } from "react";
import { getAllTasks } from "./api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Tasks() {
  const [data, setData] = useState([]);
  const { chatId } = useSettings();

  useEffect(() => {
    if (!chatId) return;
    getAllTasks(chatId)
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, [chatId]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
