import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { Link } from "lucide-react";

type DescriptionCardProps = {
  title: string;
  github: string;
  linkedin: string;
  telegram: string;
};

export function DescriptionCard(props: DescriptionCardProps) {
  return (
    <Card className="w-full max-w-xl pt-4">
      <CardTitle className="w-full space-y-3 text-center">
        {props.title}
      </CardTitle>
      <CardContent className="my-4 flex flex-row flex-wrap items-center justify-start gap-5">
        <Link
          href={props.github}
          className="flex flex-grow flex-row items-center justify-center gap-2 rounded-lg border border-input bg-muted px-2 py-1 font-bold"
        >
          Github
          <IconBrandGithub className="h-10 w-10 rounded-full bg-black stroke-white p-2"></IconBrandGithub>
        </Link>
        <Link
          href={props.linkedin}
          className="flex flex-grow flex-row items-center justify-center gap-2 rounded-lg border border-input bg-muted px-2 py-1 font-bold"
        >
          LinkedIn
          <IconBrandLinkedin className="h-10 w-10 rounded-full bg-blue-600 stroke-white p-2"></IconBrandLinkedin>
        </Link>
        <Link
          href={props.telegram}
          className="flex flex-grow flex-row items-center justify-center gap-2 rounded-lg border border-input bg-muted px-2 py-1 font-bold"
        >
          Telegram
          <IconBrandTelegram className="h-10 w-10 rounded-full bg-blue-400 stroke-white p-2"></IconBrandTelegram>
        </Link>
      </CardContent>
    </Card>
  );
}
