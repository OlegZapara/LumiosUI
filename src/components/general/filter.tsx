"use client";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function Filter(props: InputHTMLAttributes<HTMLInputElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", e.target.value);
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex w-full md:w-72">
      <div className="flex w-full flex-row gap-2">
        <Input
          className="w-full max-w-96 pl-9 font-normal"
          {...props}
          value={searchParams.get("q") || ""}
          onChange={filter}
        ></Input>
      </div>
      <div className="absolute left-3 top-3">
        <Search size={16}></Search>
      </div>
    </div>
  );
}
