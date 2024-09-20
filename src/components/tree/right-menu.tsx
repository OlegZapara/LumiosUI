import { cn } from "@/lib/utils";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import TreeInputForm from "./input-form";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { useTreeStore } from "@/state/tree-state";

export default function RightTreeMenu() {
  const state = useTreeStore();
  if (!state.activeNode) return null;
  return (
    <div className="absolute right-4 top-4 z-50 flex w-56 flex-col gap-2">
      <Button
        variant="outline"
        className="w-full justify-between border-blue-500"
      >
        Balance: {state.balance} <Wallet size={16}></Wallet>
      </Button>
      <ToggleGroup
        className={cn(
          "w-full border",
          state.mode == "add" ? "border-green-500" : "border-red-500",
        )}
        type="single"
        value={state.mode}
        onValueChange={(value) => state.setMode(value as "add" | "sub")}
      >
        <ToggleGroupItem
          className="flex-grow text-nowrap data-[state=on]:text-green-500"
          key={"add"}
          value={"add"}
          data-state={state.mode == "add" ? "on" : "off"}
          aria-label="Change week"
        >
          Add
        </ToggleGroupItem>
        <ToggleGroupItem
          className="flex-grow text-nowrap data-[state=on]:text-red-500"
          key={"sub"}
          value={"sub"}
          data-state={state.mode == "sub" ? "on" : "off"}
          aria-label="Change week"
        >
          Sub
        </ToggleGroupItem>
      </ToggleGroup>
      <TreeInputForm />
    </div>
  );
}
