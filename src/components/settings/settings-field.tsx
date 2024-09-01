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
      className={`relative flex w-full flex-col gap-2 p-2 sm:p-4 ${
        props.developer && "rounded-md border border-violet-600"
      } ${props.admin && "rounded-md border border-red-500"}`}
    >
      {props.developer && (
        <div className="absolute right-5 top-1 font-bold text-violet-500">
          DEVELOPER MODE
        </div>
      )}
      {props.admin && (
        <div className="absolute right-5 top-1 font-bold text-red-500">
          ADMIN MODE
        </div>
      )}
      <div className="leading-none tracking-tight">{props.name}</div>
      <div className="text-sm text-muted-foreground">{props.description}</div>
      <div className="flex w-full max-w-96 flex-col gap-2 sm:flex-row">
        {props.children}
      </div>
    </div>
  );
}
