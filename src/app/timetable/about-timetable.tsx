import { Badge } from "@/components/ui/badge";
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
      <SheetTrigger className="text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3">
        <HelpCircle></HelpCircle>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shortcut reference</SheetTitle>
          <SheetDescription>
            <div className="grid w-full max-w-sm items-center gap-2 m-3">
              <Label className="flex justify-between">
                Edit row: <Badge>Double click</Badge>
              </Label>
              <Label className="flex justify-between">
                Save row: <Badge>Shift-Enter</Badge>
              </Label>
              <Label className="flex justify-between">
                Move to next row: <Badge>Tab</Badge>
              </Label>
              <Label className="flex justify-between">
                Move to previous row: <Badge>Shift-Tab</Badge>
              </Label>
              <Label className="flex justify-between">
                Move to left cell: <Badge>Left arrow</Badge>
              </Label>
              <Label className="flex justify-between">
                Move to right cell: <Badge>Right arrow</Badge>
              </Label>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
