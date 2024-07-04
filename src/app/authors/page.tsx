"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll";
import { content } from "./content";
import { DescriptionCard } from "../../components/authors/description-card";

export default function StickyScrollRevealDemo() {
  return (
    <div className="">
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <StickyScroll content={content} />
      </div>
      <div className="mb-5 flex w-full flex-col items-center justify-center gap-4 px-1 md:hidden">
        <DescriptionCard
          title="Contact Bohdan Horokh"
          github="https://github.com/ikeepcalm"
          linkedin="https://www.linkedin.com/in/horokh-bohdan/"
          telegram="https://t.me/ikeepcalm"
        />
        <DescriptionCard
          title="Contact Oleh Zapara"
          github="https://github.com/OlegZapara"
          linkedin="https://www.linkedin.com/in/oleg-zapara-320a95248/"
          telegram="https://t.me/olehzpr"
        />
      </div>
    </div>
  );
}
