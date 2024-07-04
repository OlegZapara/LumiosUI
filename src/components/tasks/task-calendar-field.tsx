import { Control, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { DatePicker } from "./date-picker";

export function TaskFormCalendarField() {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="dueDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of task</FormLabel>
          <DatePicker field={field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
