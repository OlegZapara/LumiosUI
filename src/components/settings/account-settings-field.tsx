"use client";
import React from "react";
import SettingsField from "@/components/settings/settings-field";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { logout } from "@/actions/auth-actions";
import { useToast } from "@/components/ui/use-toast";

export default function AccountSettingsField(props: { username?: string }) {
  const { toast } = useToast();
  const copyUsername = () => {
    navigator.clipboard.writeText("@" + props.username).then(() => {
      toast({
        title: "Username copied",
        description: `@${props.username} was copied to clipboard`,
      });
    });
  };

  return (
    <SettingsField
      name="Current account"
      description="Telegram account that is used for this website"
    >
      <div className="flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2">
        <span className="flex-grow">
          {props.username ? "@" + props.username : ""}
        </span>
        <Button
          className="aspect-square h-8 rounded-full p-0"
          variant="ghost"
          onClick={copyUsername}
        >
          <Copy size={16}></Copy>
        </Button>
      </div>
      <form action={logout}>
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:text-red-600 sm:w-32"
        >
          Log out
        </Button>
      </form>
    </SettingsField>
  );
}
