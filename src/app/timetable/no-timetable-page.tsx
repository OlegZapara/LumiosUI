import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ArrowRight, Check, CircleOff, Sheet } from "lucide-react";
import { useEffect, useState } from "react";
import { words } from "./data";
import JsonEditor from "./json-editor";
import Settings from "./settings";

export default function NoTimetablePage() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [timetableCreated, setTimetableCreated] = useState<boolean>(false);
  const [jsonEdited, setJsonEdited] = useState<boolean>(false);

  useEffect(() => {
    setChatId(localStorage.getItem("chatId"));
  }, []);

  return (
    <div className="w-full h-full flex items-center flex-col">
      <TypewriterEffectSmooth words={words} className="mb-12" />
      <div className="flex flex-row justify-between">
        <div className="my-4 flex flex-col gap-5 items-start">
          <h1 className="text-2xl font-bold my-4">
            Oops, seems like there is no timetable
          </h1>
          <div
            className={`flex px-3 py-1 flex-row gap-2 justify-center items-center ${
              chatId ? "ring-2 ring-green-500 rounded-lg" : ""
            }`}
          >
            1. Go to settings and set chat ID
            <ArrowRight className="ml-2"></ArrowRight>
            <Settings />
            {chatId && <Check className="stroke-green-500"></Check>}
          </div>
          <div
            className={`flex px-3 py-1 flex-row gap-2 justify-center items-center ${
              timetableCreated ? "ring-2 ring-green-500 rounded-lg" : ""
            }`}
          >
            2. Click here to start creating a new timetable
            <ArrowRight className="ml-2"></ArrowRight>
            <Button
              disabled={chatId == "" || chatId == null}
              onClick={() => setTimetableCreated(true)}
              className="text-black dark:text-white text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3"
            >
              Create
            </Button>
            {timetableCreated && <Check className="stroke-green-500"></Check>}
          </div>
          <div
            className={`flex px-3 py-1 flex-row gap-2 justify-center items-center ${
              jsonEdited ? "ring-2 ring-green-500 rounded-lg" : ""
            }`}
          >
            3. <span className="text-gray-500">(Optional)</span> Paste JSON data
            of new timetable
            <ArrowRight className="ml-2"></ArrowRight>
            <JsonEditor
              onClick={() => setJsonEdited(true)}
              disabled={!timetableCreated}
            />
            {jsonEdited && <Check className="stroke-green-500"></Check>}
          </div>
        </div>
        <div className="relative h-72 w-72 my-4 ml-14">
          <Sheet className="absolute h-72 w-72 stroke-[0.75]"></Sheet>
          {!timetableCreated && (
            <CircleOff className="absolute top-[-1rem] left-[-1rem] h-80 w-80 stroke-[0.75] stroke-red-500"></CircleOff>
          )}
        </div>
      </div>
      {timetableCreated && (
        <Button
          variant="outline"
          className="border-green-500"
          onClick={() => window.location.reload()}
        >
          Go to timetable
        </Button>
      )}
    </div>
  );
}
