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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Timetable, TimetableSchema } from "@/schemas/timetable-schema";
import { getTimetable, updateTimetable } from "@/actions/timetable-actions";

export default function JsonEditor(props: any) {
  const [timetable, setTimetable] = useState<Timetable>([]);
  const { toast } = useToast();
  const [valid, setValid] = useState<boolean>(true);
  const [timetableString, setTimetableString] = useState<string>(
    JSON.stringify(timetable, null, 2),
  );

  useEffect(() => {
    getTimetable().then((res) => {
      setTimetable(res);
    });
  }, []);

  const update = () => {
    updateTimetable(JSON.parse(timetableString))
      .then(() => {
        toast({ title: "Timetable updated" });
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
        className="inline-flex h-10 items-center justify-center text-nowrap rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-background hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        Edit JSON
      </SheetTrigger>
      <SheetContent className="flex w-[60vw] min-w-[300px] !max-w-[60vw] flex-col gap-4 pr-12">
        <SheetHeader className="h-full">
          <SheetTitle className="flex flex-row items-center justify-between gap-4">
            <div className="py-2">JSON Editor</div>
            {!valid && (
              <div className="font-semibold text-red-500">Not a valid json</div>
            )}
            <div className="flex flex-row gap-2">
              <Button
                onClick={update}
                variant="outline"
                disabled={!valid}
                className="border-green-500 text-green-500 hover:border-green-600 hover:text-green-600"
              >
                Save
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:border-red-600 hover:text-red-600"
                onClick={discardEdit}
              >
                Discard
              </Button>
            </div>
          </SheetTitle>
          <Textarea
            className={`h-full w-full ${
              valid ||
              "border-red-500 focus-visible:ring-4 focus-visible:ring-red-500"
            }`}
            value={timetableString}
            onChange={(e) => {
              let jsonValue;
              try {
                jsonValue = JSON.parse(e.target.value);
              } catch (e) {
                jsonValue = "";
              }
              const validationResult = TimetableSchema.safeParse(jsonValue);
              setValid(validationResult.success);
              setTimetableString(e.target.value);
            }}
          ></Textarea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
