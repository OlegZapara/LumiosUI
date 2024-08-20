"use client";
import React from "react";
import TelegramLoginButton from "telegram-login-button";
import { login } from "@/actions/auth-actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type TelegramLoginProps = {
  size: "large" | "medium" | "small";
};

function TelegramLogin(props: TelegramLoginProps) {
  const { toast } = useToast();

  if (process.env.NODE_ENV == "development") {
    return (
      <Button
        variant="ghost"
        className="font-semibold text-orange-500 hover:text-orange-700"
        onClick={() => {
          const id = parseInt(process.env.NEXT_PUBLIC_DEV_USER_ID!);
          login(id).then((username) => {
            toast({ title: `Logged in as ${username}` });
          });
        }}
      >
        Log in (dev)
      </Button>
    );
  }

  return (
    <TelegramLoginButton
      botName="lumios_bot"
      buttonSize={props.size}
      dataOnauth={(user) => {
        login(user.id).then(() => {
          toast({ title: `Logged in as ${user.username}` });
        });
      }}
    />
  );
}

export default TelegramLogin;
