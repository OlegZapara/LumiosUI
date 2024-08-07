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
      <SheetTrigger className="inline-flex h-10 items-center justify-center text-nowrap rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-background hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
        <HelpCircle></HelpCircle>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shortcut reference</SheetTitle>
          <SheetDescription>
            <div className="m-3 grid w-full max-w-sm items-center gap-2">
              <Label className="flex justify-between">
                Edit row: <Badge>Double click</Badge>
              </Label>
              <Label className="flex justify-between">
                Save row: <Badge>Shift-Enter</Badge>
              </Label>
              <Label className="flex justify-between">
                Move to next cell: <Badge>Tab</Badge>
              </Label>
              <Label className="flex justify-between">
                Discard edit: <Badge>Esc</Badge>
              </Label>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
