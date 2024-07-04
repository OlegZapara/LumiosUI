import { useTheme } from "next-themes";
import { Label } from "../ui/label";
import { RadioGroupItem } from "../ui/radio-group";

type ThemeColors = {
  bg: string;
  main: string;
  accent: string;
};

const ThemeColors = {
  system: { bg: "bg-slate-500", main: "bg-slate-400", accent: "bg-slate-200" },
  dark: { bg: "bg-slate-950", main: "bg-slate-800", accent: "bg-slate-400" },
  light: { bg: "bg-[#ecedef]", main: "bg-white", accent: "bg-[#ecedef]" },
};

export function ThemeViewGroupItem({
  type,
}: {
  type: "light" | "dark" | "system";
}) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={type} id={type} hidden />
      <Label
        htmlFor={type}
        className="mx-10 flex w-full flex-col items-center justify-center sm:mx-0 sm:w-56"
      >
        <div className="h-40 w-full">
          <ThemeIcon theme={type} colors={ThemeColors[type]} />
        </div>
        <div className="capitalize">{type} theme</div>
      </Label>
    </div>
  );
}

function ThemeIcon(props: {
  theme: "light" | "dark" | "system";
  colors: ThemeColors;
}) {
  const theme = useTheme();
  const { bg, main, accent } = props.colors;
  return (
    <div
      className={`items-center rounded-md border-2 ${
        theme.theme == props.theme ? "border-blue-500" : "border-muted"
      } bg-popover p-1 hover:bg-accent hover:text-accent-foreground`}
    >
      <div className={`space-y-2 rounded-sm p-2 ${bg}`}>
        <div className={`space-y-2 rounded-md p-2 shadow-sm ${main}`}>
          <div className={`h-2 w-[80px] rounded-lg ${accent}`}></div>
          <div className={`h-2 w-[100px] rounded-lg ${accent}`}></div>
        </div>
        <div
          className={`flex items-center space-x-2 rounded-md p-2 shadow-sm ${main}`}
        >
          <div className={`h-4 w-4 rounded-full ${accent}`}></div>
          <div className={`h-2 w-[100px] rounded-lg ${accent}`}></div>
        </div>
        <div
          className={`flex items-center space-x-2 rounded-md p-2 shadow-sm ${main}`}
        >
          <div className={`h-4 w-4 rounded-full ${accent}`}></div>
          <div className={`h-2 w-[100px] rounded-lg ${accent}`}></div>
        </div>
      </div>
    </div>
  );
}
