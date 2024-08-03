import { getTasks } from "@/actions/tasks-actions";
import { columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";

export default async function Tasks() {
  const tasks = await getTasks();

  return (
    <div className="mx-auto px-1 py-10 sm:container">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
