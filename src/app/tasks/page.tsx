"use client";

import { useEffect } from "react";
import { useTasksStore } from "../stores/tasks";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Tasks() {
  const { tasks, fetchTasks } = useTasksStore((state) => state);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto py-10 mt-6">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
