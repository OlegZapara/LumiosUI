"use client";
import LeftTreeMenu from "@/components/tree/left-menu";
import RightTreeMenu from "@/components/tree/right-menu";
import Tree from "@/components/tree/tree";

export default function TreePage() {
  return (
    <div className="relative">
      <RightTreeMenu />
      <LeftTreeMenu />
      <Tree></Tree>
    </div>
  );
}
