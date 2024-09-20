import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTreeStore } from "@/state/tree-state";

const formSchema = z.object({
  value: z.string().regex(/^[0-9]\d*$/, {
    message: "Value must a positive number",
  }),
});

export default function TreeInputForm() {
  const state = useTreeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      value: state.change == 0 ? "" : Math.abs(state.change).toString(),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.value === "") return;
    const value = parseInt(data.value);
    if (value > state.balance) {
      form.setError("value", {
        message: "Not enough balance",
      });
    }
    form.setValue("value", value.toString());
    console.log(data);
  }

  function updateChange(value: string) {
    try {
      formSchema.parse({ value });
    } catch {
      state.setChange(0);
      return value;
    }
    const intValue = parseInt(value);
    state.setChange(intValue);

    return value;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
    >
      <div className="flex w-full flex-row gap-1">
        <Controller
          name={"value"}
          control={form.control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={(event) =>
                field.onChange(updateChange(event.target.value))
              }
              className="focus-visible:ring-0"
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
              type="text"
              autoFocus
              autoComplete="off"
              placeholder="Enter amount"
            />
          )}
        />
        <Button className="h-full" variant="outline" type="submit">
          Submit
        </Button>
      </div>
      {form.formState.errors.value && (
        <div className="w-full text-center text-red-500">
          {form.formState.errors.value.message}
        </div>
      )}
    </form>
  );
}
