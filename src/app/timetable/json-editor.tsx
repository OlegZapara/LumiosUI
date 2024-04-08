import React, { useCallback, useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Timetable } from "./columns";
import { setTimetable } from "@/slices/timetable-slice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function JsonEditor(props: any) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [valid, setValid] = useState<boolean>(true);
  const timetable = useSelector<RootState, Timetable[] | null>(
    (state) => state.timetable.timetable
  );
  const [timetableString, setTimetableString] = useState<string>(
    JSON.stringify(timetable, null, 2)
  );
  const updateTimetable = useCallback(() => {
    fetch(`/api/timetables?chatId=${"-1001767321866"}`, {
      method: "PUT",
      body: JSON.stringify(timetable),
    })
      .then((res) => res.text())
      .then((text) =>
        toast({
          title: "Timetable updated",
          description: text,
        })
      )
      .catch((err) =>
        toast({
          title: "Timetable was not updated updated",
          variant: "destructive",
          description: err,
        })
      );
  }, [timetable, toast]);
  return (
    <Sheet>
      <SheetTrigger {...props} className="text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3">
        Edit JSON
      </SheetTrigger>
      <SheetContent className="w-[60vw] !max-w-[60vw] min-w-[300px] flex gap-4 flex-col pr-12">
        <SheetHeader className="h-full">
          <SheetTitle className="flex flex-row gap-4 items-center justify-between">
            <div className="py-2">JSON Editor</div>
            {!valid && (
              <div className="font-semibold text-red-500">Not a valid json</div>
            )}
            <div className="flex flex-row gap-2">
              <Button
                onClick={() => updateTimetable()}
                variant="outline"
                disabled={!valid}
                className="border-green-500 text-green-500 hover:text-green-600 hover:border-green-600"
              >
                Save
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:text-red-600 hover:border-red-600"
              >
                Discard
              </Button>
            </div>
          </SheetTitle>
          <Textarea
            className={`h-full w-full ${
              valid
                ? ""
                : "border-red-500 focus-visible:ring-red-500 focus-visible:ring-4"
            }`}
            value={timetableString}
            onChange={(e) => {
              try {
                const timetable: Timetable[] = JSON.parse(e.target.value);
                dispatch(setTimetable(timetable));
                setValid(true);
              } catch {
                setValid(false);
              } finally {
                setTimetableString(e.target.value);
              }
            }}
          ></Textarea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
