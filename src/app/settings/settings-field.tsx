import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ReactNode, SetStateAction } from "react";

interface SettingsFieldProps {
  name: string;
  description: string;
  developer?: boolean;
  children: ReactNode;
}

export default function SettingsField(props: SettingsFieldProps) {
  return (
    <div
      className={`w-full flex flex-col gap-2 relative p-2 sm:p-4 ${
        props.developer && "border border-orange-400 rounded-md"
      }`}
    >
      {props.developer && (
        <div className="absolute text-orange-400 right-5 font-bold top-1">
          DEVELOPER MODE
        </div>
      )}
      <div className="leading-none tracking-tight">{props.name}</div>
      <div className="text-sm text-muted-foreground">{props.description}</div>
      <div className="flex flex-col sm:flex-row w-full gap-2 max-w-96">
        {props.children}
      </div>
    </div>
  );
}
