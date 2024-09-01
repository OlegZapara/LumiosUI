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
        className="gap-1 font-semibold"
        onClick={() => {
          const id = parseInt(process.env.NEXT_PUBLIC_DEV_USER_ID!);
          toast({ title: `Requesting user information...` });
          setTimeout(() => {
            login(id).then((username) => {
              toast({ title: `Logged in as ${username}` });
            });
          }, 2000); // Simulate request delay
        }}
      >
        Log in{" "}
        <span className="inline-block bg-gradient-to-tr from-fuchsia-500 via-violet-600 to-blue-500 bg-clip-text text-transparent">
          (dev)
        </span>
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <TelegramLoginButton
        botName="lumios_bot"
        buttonSize={props.size}
        dataOnauth={(user) => {
          toast({ title: `Requesting user information...` });
          login(user.id).then(() => {
            toast({ title: `Logged in as ${user.username}` });
          });
        }}
      />
    </div>
  );
}

export default TelegramLogin;
