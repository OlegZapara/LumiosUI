import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Download } from "lucide-react";
import { useTimetableStore } from "@/app/stores/timetable";
import { useToast } from "@/components/ui/use-toast";
import { emptyTimetable } from "@/app/timetable/data";
import { timetableScheme } from "@/app/timetable/timetable-scheme";

export default function NoTimetablePageV2() {
  const timetableStore = useTimetableStore();
  const { toast } = useToast();

  function createEmptyTimetable() {
    timetableStore.createTimetable(emptyTimetable).then((res) => {
      if (res.ok) {
        toast({
          title: "Timetable was created successfully",
        });
        timetableStore.fetchTimetable();
      } else {
        toast({
          title: "Timetable was not updated",
          variant: "destructive",
          description:
            "Error happened while updating timetable, make sure that all fields are filled properly",
        });
      }
    });
  }

  return (
    <div className="container my-10 flex flex-col items-center justify-center gap-2">
      <div className="text-3xl flex flex-row gap-2 justify-center items-center font-semibold">
        Seems like this chat does not have a timetable{" "}
      </div>
      <div className="flex justify-center items-center">
        If you want to create new Timetable make an empty one or import JSON
        timetable
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-6 my-6">
        <TimetableOptionCard
          title="Create empty timetable"
          image="/data-filling.png"
          onClick={createEmptyTimetable}
        ></TimetableOptionCard>
        <Dialog>
          <DialogTrigger asChild>
            <TimetableOptionCard
              title="Import JSON timetable"
              image="/JSON.jpeg"
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
                download="example.json"
                className="p-0 aspect-square h-8 w-8 cursor-pointer border border-input rounded-lg flex justify-center items-center hover:bg-muted"
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
      <Card className="py-4 px-8 hover:border-blue-500">
        <CardTitle>{props.title}</CardTitle>
        <CardContent className="p-2 mt-4 flex justify-center items-center">
          <Image
            src={image}
            alt={props.title + " image"}
            height={500}
            width={500}
            className="object-cover pointer-events-none aspect-[4/3] max-w-[30vw] min-w-[200px] rounded-lg border-input border"
          ></Image>
        </CardContent>
      </Card>
    </button>
  );
}

function DragNDropField() {
  const timetableStore = useTimetableStore();
  const { toast } = useToast();
  function processFile(files: File[]) {
    const jsonFile = files[0];
    readJSONFile(jsonFile)
      .then((data: any) => {
        const parseResult = timetableScheme.safeParse(data);
        if (parseResult.success) {
          timetableStore.createTimetable(data).then((res) => {
            if (res.ok) {
              toast({
                title: "Timetable was created successfully",
              });
              timetableStore.fetchTimetable();
            } else {
              toast({
                title: "Timetable was not updated",
                variant: "destructive",
                description:
                  "Error happened while updating timetable, make sure that all fields are filled properly",
              });
            }
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
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
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
