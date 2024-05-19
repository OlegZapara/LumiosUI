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
import { CalendarIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTasksStore } from "../stores/tasks";

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
      },
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
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  className?: string;
  type: "edit" | "create";
  task?: Task;
}

function getDate(date: Date | string | undefined): Date {
  if (typeof date == "string") {
    const parts = date.split("-").map((x) => parseInt(x));
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  if (typeof date == "undefined") return new Date();
  return date;
}

export default function TaskDialog(props: TaskDialogProps) {
  const { updateTask, createTask } = useTasksStore();

  // const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props.task,
      dueDate: getDate(props.task?.dueDate),
      dueTime: props.task?.dueTime.substring(0, 5),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.setOpen(false);
    const task: Task = { ...values, id: props.task?.id! };
    task.dueDate.setMinutes(
      task.dueDate.getMinutes() - task.dueDate.getTimezoneOffset(),
    );
    if (props.type == "create") {
      createTask(task);
    } else {
      updateTask(task);
    }
  }

  useEffect(() => {
    props.setOpen(props.open ?? false);
  }, [props, props.open]);

  useEffect(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
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
