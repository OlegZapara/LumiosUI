import { PersonInfo3dCard } from "./person-3d-card";

export function OlehCard() {
  return (
    <PersonInfo3dCard
      name={"Oleh Zapara"}
      imageUrl="/me.png"
      description={
        <div>
          <span className="font-bold">Position</span>: Fullstack{" "}
          <span className="rounded-lg bg-yellow-400 px-2 py-0.5 font-bold text-white">
            JavaScript
          </span>{" "}
          and{" "}
          <span className="rounded-lg bg-green-700 px-1.5 py-0.5 font-bold text-white">
            C#
          </span>{" "}
          Developer
        </div>
      }
      github="https://github.com/OlegZapara"
      linkedin="https://www.linkedin.com/in/oleg-zapara-320a95248/"
      telegram="https://t.me/olehzpr"
    />
  );
}
