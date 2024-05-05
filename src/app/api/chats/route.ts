import { NextRequest, NextResponse } from "next/server";

const chats = [
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(
      Math.random() * 100
    )} this group also has very very long name that i cannot fit`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
  {
    image: "/lumios.png",
    name: `Group ${Math.floor(Math.random() * 100)}`,
    description:
      "Very interesting description of the group that can also sometimes be very long and i wanna be sure that it does not ruit my layout",
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(chats.slice(0, 2));
}
