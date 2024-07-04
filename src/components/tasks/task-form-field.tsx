import { InputHTMLAttributes } from "react";
import { Control, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type TaskFormFieldProps = {
  label: string;
  name: "taskName" | "dueDate" | "dueTime" | "url";
} & InputHTMLAttributes<HTMLInputElement>;

export function TaskFormTextField(props: TaskFormFieldProps) {
  const form = useFormContext();
  const { name, label, ...inputProps } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
