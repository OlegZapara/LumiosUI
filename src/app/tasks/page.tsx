"use client";

import useAuth from "@/hooks/useAuth";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useTasksStore } from "../stores/tasks";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Tasks() {
  const { tasks, fetchTasks } = useTasksStore((state) => state);
  const authenticated = useAuth();

  useEffect(() => {
    if (authenticated == null) return;
    fetchTasks();
  }, [authenticated, fetchTasks]);

  if (authenticated == null) return null;
  if (!authenticated) return notFound();

  return (
    <div className="px-1 sm:container mx-auto py-10">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
