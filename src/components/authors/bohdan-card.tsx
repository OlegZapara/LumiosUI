import { PersonInfo3dCard } from "./person-3d-card";

export function BohdanCard() {
  return (
    <PersonInfo3dCard
      name={"Bohdan Horokh"}
      imageUrl="/Bohdan.jpg"
      description={
        <div>
          <span className="font-bold">Position</span>: Back-end{" "}
          <span className="rounded-lg bg-orange-800 px-2 py-0.5 font-bold text-white">
            Java
          </span>{" "}
          Developer / Engineer
        </div>
      }
      github="https://github.com/ikeepcalm"
      linkedin="https://www.linkedin.com/in/horokh-bohdan/"
      telegram="https://t.me/ikeepcalm"
    />
  );
}
