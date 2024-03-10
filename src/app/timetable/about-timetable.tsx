import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HelpCircle } from "lucide-react";

export default function AboutTimetable() {
  return (
    <Sheet>
      <SheetTrigger className="font-medium text-sm inline-flex w-12 h-12 items-center justify-center rounded-md bg-muted">
        <HelpCircle></HelpCircle>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shortcut reference</SheetTitle>
          <SheetDescription>
            <div className="grid w-full max-w-sm items-center gap-2 m-3">
              <Label>Edit row: Double click</Label>
              <Label>Save row: Shift-Enter</Label>
              <Label>Move to next row: Tab</Label>
              <Label>Move to previous row: Shift-Tab</Label>
              <Label>Move to left cell: Left arrow</Label>
              <Label>Move to right cell: Right arrow</Label>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
