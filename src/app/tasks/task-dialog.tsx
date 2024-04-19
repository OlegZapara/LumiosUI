"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, SquarePen } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSettings from "@/hooks/useSettings";
import { Task } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTask, updateTask } from "./api";

const formSchema = z.object({
  taskName: z.string().trim().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  dueDate: z.date({
    required_error: "A date of task is required",
  }),
  dueTime: z
    .string()
    .trim()
    .refine(
      (time) => {
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // HH:MM format 24 hours
        return regex.test(time);
      },
      {
        message: "Invalid time format. Use HH:MM (24-hour) format.",
      }
    ),
  url: z
    .union([
      z.string().trim().url({
        message: "Invalid URL format",
      }),
      z.string().trim().max(0),
    ])
    .default(""),
});

interface TaskDialogProps {
  children: ReactNode;
  type: "edit" | "create";
  task?: Task;
}

export default function TaskDialog(props: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const { chatId } = useSettings();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props.task,
      dueTime: props.task?.dueTime.substring(0, 5),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    const task: Task = { ...values, id: props.task?.id! };
    if (props.type == "create") {
      createTask(chatId!, task)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    } else {
      updateTask(chatId!, task)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }
  useEffect(() => {
    form.reset();
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {props.type == "create" ? (
        <CreateTaskButton>{props.children}</CreateTaskButton>
      ) : (
        <UpdateTaskButton>{props.children}</UpdateTaskButton>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            {props.type.charAt(0).toUpperCase() +
              props.type.slice(1).toLowerCase()}{" "}
            task form
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key == "Enter") e.preventDefault();
              }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="taskName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the task</FormLabel>
                    <FormControl>
                      <Input placeholder="Task name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of task</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="text-muted-foreground font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto" align="end">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of task</FormLabel>
                    <FormControl>
                      <Input placeholder="Time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Task url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <Button type="submit" variant="outline">
                  {props.type.charAt(0).toUpperCase() +
                    props.type.slice(1).toLowerCase()}{" "}
                  task
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function CreateTaskButton(props: { children: ReactNode }) {
  return (
    <DialogTrigger className="border-green-500 ml-auto h-10 px-4 py-2 relative mr-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground">
      <PlusCircle className="absolute h-5 w-5 left-3 stroke-green-500"></PlusCircle>
      <div className="pl-6 text-green-500">{props.children}</div>
    </DialogTrigger>
  );
}

function UpdateTaskButton(props: { children: ReactNode }) {
  return (
    <DialogTrigger className="border-blue-500 ml-auto h-10 px-4 py-2 relative mr-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground">
      <SquarePen className="absolute h-5 w-5 left-3 stroke-blue-500"></SquarePen>
      <div className="pl-6 text-blue-500">{props.children}</div>
    </DialogTrigger>
  );
}
