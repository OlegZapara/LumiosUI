import { useTreeStore } from "@/state/tree-state";
import { ChangeEvent, FormEvent, useEffect, useState, forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";

const TreeInputForm = forwardRef<HTMLInputElement>((props, ref) => {
  const state = useTreeStore();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("working");
  }

  function updateChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setError("");
      setValue("");
      state.setChange(0);
      return;
    }
    try {
      z.string().regex(/^\d*$/).parse(inputValue);
      setError("");
    } catch (e) {
      setError("Invalid number");
      setValue(event.target.value);
      state.setChange(0);
      return;
    }
    const intValue = parseInt(inputValue);
    const activeNodeValue = parseInt(state.activeNode!.value);
    if (state.mode == "sub" && activeNodeValue < intValue) {
      if (state.balance < intValue && activeNodeValue > state.balance) {
        return;
      }
      state.setChange(activeNodeValue);
      setValue(activeNodeValue.toString());
      return;
    }
    if (state.balance < intValue) {
      state.setChange(state.balance);
      setValue(state.balance.toString());
      return;
    }
    if (state.balance < intValue) return;
    setValue(event.target.value);
    state.setChange(intValue);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-row gap-1">
        <Input
          ref={ref}
          value={value}
          onChange={updateChange}
          className="focus-visible:ring-0"
          type="text"
          autoFocus
          autoComplete="off"
          placeholder="Enter amount"
        />
        <Button className="h-full" variant="outline" type="submit">
          Submit
        </Button>
      </div>
      {error && <div className="w-full text-center text-red-500">{error}</div>}
    </form>
  );
});

TreeInputForm.displayName = "TreeInputForm";

export default TreeInputForm;
