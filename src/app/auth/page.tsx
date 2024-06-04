import TelegramSignIn from "@/components/auth/TelegramSignIn";

export default function Auth() {
  if (process.env.TELEGRAM_BOT_USERNAME === undefined) {
    return <div>TELEGRAM_BOT_USERNAME is not set</div>;
  }
  return (
    <div>
      <TelegramSignIn
        botName={process.env.TELEGRAM_BOT_USERNAME}
        size="large"
      />
    </div>
  );
}
