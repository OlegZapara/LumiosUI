"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import {
  Timetable,
  TimetableDay,
  TimetableSchema,
} from "@/schemas/timetable-schema";
import { createTimetable } from "@/actions/timetable-actions";

const emptyDays: TimetableDay[] = [
  { dayName: "MONDAY", classEntries: [] },
  { dayName: "TUESDAY", classEntries: [] },
  { dayName: "WEDNESDAY", classEntries: [] },
  { dayName: "THURSDAY", classEntries: [] },
  { dayName: "FRIDAY", classEntries: [] },
];
const emptyTimetable: Timetable = [
  { days: emptyDays, weekType: "WEEK_A" },
  { days: emptyDays, weekType: "WEEK_B" },
];

export default function NoTimetablePage() {
  const { toast } = useToast();
  const theme = useTheme();

  function createEmptyTimetable() {
    createTimetable(emptyTimetable).then(() => {
      toast({ title: "Timetable was created successfully" });
    });
  }

  return (
    <div className="container my-10 flex flex-col items-center justify-center gap-2">
      <div className="flex flex-row items-center justify-center gap-2 text-3xl font-semibold">
        Seems like this chat does not have a timetable{" "}
      </div>
      <div className="flex items-center justify-center">
        If you want to create new Timetable make an empty one or import JSON
        timetable
      </div>
      <div className="my-6 flex flex-row flex-wrap justify-center gap-6">
        <TimetableOptionCard
          title="Create empty timetable"
          image={`/data-filling-${theme.resolvedTheme ?? "light"}.png`}
          onClick={createEmptyTimetable}
        ></TimetableOptionCard>
        <Dialog>
          <DialogTrigger asChild>
            <TimetableOptionCard
              title="Import JSON timetable"
              image={`/JSON-${theme.resolvedTheme ?? "light"}.png`}
            ></TimetableOptionCard>
          </DialogTrigger>
          <DialogContent>
            <span className="font-semibold">
              Click on the field or drag JSON file to upload
            </span>
            <span className="flex items-center gap-2">
              To fill required values refer to this example{" "}
              <a
                href="/example-timetable.json"
                download="example-timetable.json"
                className="flex aspect-square h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-input p-0 hover:bg-muted"
              >
                <Download size={16}></Download>
              </a>
            </span>
            <DragNDropField></DragNDropField>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface TimetableOptionCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  image: string;
}

function TimetableOptionCard(props: TimetableOptionCardProps) {
  const { title, image, ...buttonProps } = props;

  return (
    <button {...buttonProps} className="flex-grow">
      <Card className="px-8 py-4 hover:border-blue-500">
        <CardTitle>{props.title}</CardTitle>
        <CardContent className="mt-4 flex items-center justify-center p-2">
          <Image
            src={image}
            alt={props.title + " image"}
            height={500}
            width={500}
            className="pointer-events-none aspect-[4/3] min-w-[200px] max-w-[30vw] rounded-lg border border-input object-cover"
          ></Image>
        </CardContent>
      </Card>
    </button>
  );
}

function DragNDropField() {
  const { toast } = useToast();

  function processFile(files: File[]) {
    const jsonFile = files[0];
    readJSONFile(jsonFile)
      .then((data: any) => {
        const parseResult = TimetableSchema.safeParse(data);
        if (parseResult.success) {
          createTimetable(data)
            .then(() => {
              toast({ title: "Timetable was created successfully" });
            })
            .catch(() => {
              toast({
                title: "Timetable was not updated",
                variant: "destructive",
                description:
                  "Error happened while updating timetable, make sure that all fields are filled properly",
              });
            });
        } else {
          toast({
            title: "Provided file is not a valid timetable",
            variant: "destructive",
            description: "Make sure that all fields are filled properly",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: processFile,
    multiple: false,
    accept: {
      "application/json": [".json"],
    },
  });

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop JSON file
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>{" "}
      </div>
    </section>
  );
}

const readJSONFile = (file: File): Promise<object> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        try {
          const json = JSON.parse(event.target.result);
          resolve(json);
        } catch (error) {
          reject(new Error("Error parsing JSON"));
        }
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};
