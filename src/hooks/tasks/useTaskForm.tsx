import { createTask, updateTask } from "@/actions/tasks-actions";
import { useToast } from "@/components/ui/use-toast";
import { Task, TaskSchema } from "@/schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = TaskSchema.omit({ id: true });

export function useTaskForm(type: "edit" | "create", task?: Task) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (type === "edit") {
      form.reset(task);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearForm = () => form.reset();

  function onSubmit(submittedTask: z.infer<typeof formSchema>) {
    if (type === "edit") {
      updateTask({ ...submittedTask, id: task!.id }).then(() => {
        toast({ title: "Task updated successfully" });
        clearForm();
      });
    } else {
      createTask(submittedTask).then(() => {
        toast({ title: "Task created successfully" });
        clearForm();
      });
    }
  }

  return { form, onSubmit, clearForm };
}
