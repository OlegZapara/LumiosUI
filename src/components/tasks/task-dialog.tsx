"use client";
import { TaskFormCalendarField } from "@/components/tasks/task-calendar-field";
import { TaskFormTextField } from "@/components/tasks/task-form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useTaskForm } from "@/hooks/tasks/useTaskForm";
import { Task } from "@/schemas/task-schema";
import { PlusCircle, SquarePen } from "lucide-react";
import { PropsWithChildren } from "react";

const properties = {
  edit: { color: "blue", text: "Edit", Icon: SquarePen },
  create: { color: "green", text: "Create", Icon: PlusCircle },
};

type TaskDialogProps = {
  type: "edit" | "create";
  task?: Task;
} & PropsWithChildren;

export default function TaskDialog(props: TaskDialogProps) {
  const { color, text, Icon } = properties[props.type];
  const { form, onSubmit, clearForm } = useTaskForm(props.type, props.task);

  return (
    <Dialog>
      <DialogTrigger asChild={props.children != null}>
        {props.children ? (
          props.children
        ) : (
          <div
            className={`border-${color}-500 relative ml-auto mr-4 inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
          >
            <Icon className={`absolute left-3 h-5 w-5 stroke-${color}-500`} />
            <div className={`pl-6 text-${color}-500`}>{text}</div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-4">{text} task form</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TaskFormTextField
              name="taskName"
              label="Short task description"
              placeholder="Task name"
            />
            <TaskFormCalendarField />
            <TaskFormTextField
              name="dueTime"
              label="Due time of the task"
              placeholder="HH:MM:SS"
            />
            <TaskFormTextField
              name="url"
              label="Task URL"
              placeholder="Enter task URL (optional)"
            />
            <div className="flex flex-row justify-between">
              <DialogClose asChild disabled={!form.formState.isValid}>
                <Button type="submit" variant="outline">
                  {text} task
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="outline" onClick={clearForm}>
                  Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
