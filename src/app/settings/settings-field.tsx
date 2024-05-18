import { ReactNode } from "react";

interface SettingsFieldProps {
  name: string;
  description: string;
  developer?: boolean;
  admin?: boolean;
  children: ReactNode;
}

export default function SettingsField(props: SettingsFieldProps) {
  if (props.developer && process.env.NODE_ENV === "production") {
    return null;
  }
  return (
    <div
      className={`w-full flex flex-col gap-2 relative p-2 sm:p-4 ${
        props.developer && "border border-orange-400 rounded-md"
      } ${props.admin && "border border-red-500 rounded-md"}`}
    >
      {props.developer && (
        <div className="absolute text-orange-400 right-5 font-bold top-1">
          DEVELOPER MODE
        </div>
      )}
      {props.admin && (
        <div className="absolute text-red-500 right-5 font-bold top-1">
          ADMIN MODE
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
