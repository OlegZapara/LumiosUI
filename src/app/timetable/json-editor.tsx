"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useTimetableStore } from "../stores/timetable";
import { timetableScheme } from "@/app/timetable/timetable-scheme";

export default function JsonEditor(props: any) {
  const timetableStore = useTimetableStore();

  const { toast } = useToast();
  const [valid, setValid] = useState<boolean>(true);
  const timetable = timetableStore.timetable;
  const [timetableString, setTimetableString] = useState<string>(
    JSON.stringify(timetable, null, 2),
  );
  const updateTimetable = () => {
    timetableStore
      .updateTimetable(JSON.parse(timetableString))
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Timetable updated",
          });
          timetableStore.fetchTimetable();
        } else
          toast({
            title: "Timetable was not updated updated",
            variant: "destructive",
            description:
              "Error happened while updating timetable, make sure that all fields are filled properly",
          });
      })
      .catch((err) =>
        toast({
          title: "Timetable was not updated updated",
          variant: "destructive",
          description: err,
        }),
      );
  };
  const discardEdit = () => {
    setTimetableString(JSON.stringify(timetable, null, 2));
    setValid(true);
  };
  return (
    <Sheet>
      <SheetTrigger
        {...props}
        className="text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3"
      >
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
                onClick={updateTimetable}
                variant="outline"
                disabled={!valid}
                className="border-green-500 text-green-500 hover:text-green-600 hover:border-green-600"
              >
                Save
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:text-red-600 hover:border-red-600"
                onClick={discardEdit}
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
              let jsonValue;
              try {
                jsonValue = JSON.parse(e.target.value);
              } catch (e) {
                jsonValue = "";
              }
              const validationResult = timetableScheme.safeParse(jsonValue);
              setValid(validationResult.success);
              setTimetableString(e.target.value);
            }}
          ></Textarea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
