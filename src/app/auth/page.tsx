"use client";

import React from "react";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

export default function Auth() {
  return (
    <TelegramLoginButton
      botName="samplebot"
      dataOnauth={(user: TelegramUser) => console.log(user)}
    />
  );
}
