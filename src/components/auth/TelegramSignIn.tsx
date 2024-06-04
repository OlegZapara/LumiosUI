"use client";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

type TelegramSignInProps = {
  botName: string;
  size: "large" | "medium" | "small";
};

export default function TelegramSignIn(props: TelegramSignInProps) {
  function singIn(user: TelegramUser) {
    console.log(user);
    fetch("/api/auth/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      console.log(res);
    });
  }
  return (
    <TelegramLoginButton
      botName={props.botName}
      buttonSize={props.size}
      dataOnauth={singIn}
    />
  );
}
