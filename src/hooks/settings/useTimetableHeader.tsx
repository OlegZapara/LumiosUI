import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export function useTimetableHeader() {
  const { toast } = useToast();
  const [timetableHeader, setTimetableHeader] = useState<string>("Enabled");

  useEffect(() => {
    setTimetableHeader(
      localStorage.getItem("enableTimetableHeader") ?? "Enabled",
    );
  }, []);

  const updateTimetableHeader = () => {
    localStorage.setItem("enableTimetableHeader", timetableHeader);
    toast({
      title: "Timetable header updated",
      description: `Timetable header is now ${timetableHeader.toLowerCase()}`,
    });
  };

  return { timetableHeader, setTimetableHeader, updateTimetableHeader };
}
