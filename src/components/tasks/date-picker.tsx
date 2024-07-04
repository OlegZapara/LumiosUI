import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DatePickerProps = {
  field: ControllerRenderProps<any, "dueDate">;
};

export function DatePicker({ field }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className="font-normal text-muted-foreground"
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
          selected={field.value as any}
          onSelect={(date) => {
            date!.setMinutes(date!.getMinutes() - date!.getTimezoneOffset());
            field.onChange(date?.toISOString().split("T")[0]);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
