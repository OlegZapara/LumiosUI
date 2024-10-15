"use client";
import LeftTreeMenu from "@/components/tree/left-menu";
import RightTreeMenu from "@/components/tree/right-menu";
import Tree from "@/components/tree/tree";

export default function TreePage() {
  if (!process.env.NEXT_PUBLIC_TREE_ENABLED) {
    return (
      <h1 className="mt-10 w-full text-center text-2xl">
        🚧 This feature is currently in development ⚒️
      </h1>
    );
  }
  return (
    <div className="relative">
      <RightTreeMenu />
      <LeftTreeMenu />
      <Tree></Tree>
    </div>
  );
}
