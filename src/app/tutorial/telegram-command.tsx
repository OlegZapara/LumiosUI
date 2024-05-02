import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function TelegramCommand({ command }: { command: string }) {
  const splitString = command.split(" ");
  const keyword = splitString[0];
  const args = " " + splitString.slice(1).join(" ");
  return (
    <div className="px-4 py-2 flex flex-row bg-muted rounded-md">
      <pre className={`text-blue-500 ${inter.className}`}>{keyword}</pre>
      <pre className={`text-wrap ${inter.className}`}>{args}</pre>
    </div>
  );
}
