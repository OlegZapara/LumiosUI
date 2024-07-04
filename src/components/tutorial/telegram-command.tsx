import { InterFont } from "@/lib/fonts";

type TelegramCommandeProps = { command: string };

export default function TelegramCommand({ command }: TelegramCommandeProps) {
  const splitString = command.split(" ");
  const keyword = splitString[0];
  const args = " " + splitString.slice(1).join(" ");
  return (
    <div className="flex flex-row rounded-md bg-muted px-4 py-2">
      <pre className={`text-blue-500 ${InterFont.className}`}>{keyword}</pre>
      <pre className={`text-wrap ${InterFont.className}`}>{args}</pre>
    </div>
  );
}
