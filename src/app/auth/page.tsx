"use client";

import React from "react";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

export default function Auth() {
  return (
    <TelegramLoginButton
      botName="lumios_bot"
      dataOnauth={(user: TelegramUser) => console.log(user)}
    />
  );
}
