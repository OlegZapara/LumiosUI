import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { getSession, login, updateChatId } from "@/actions/auth-actions";
import TextSettingsField from "@/components/settings/text-settings-field";
import Link from "next/link";
import AccountSettingsField from "@/components/settings/account-settings-field";
import SettingsSection from "@/components/settings/settings-section";
import SettingsField from "@/components/settings/settings-field";

export default async function GeneralSettings() {
  const session = await getSession();

  return (
    <div className="ml-1 flex w-full flex-col gap-4">
      <div className="text-xl font-semibold leading-none tracking-tight">
        General settings
      </div>
      <div className="text-sm text-muted-foreground">
        General app settings that are used for your account functions
      </div>
      <Separator></Separator>
      <SettingsSection title="Account Settings">
        <AccountSettingsField username={session?.user.username} />
        <TextSettingsField
          name="UserId"
          description="Telegram User ID (used for testing)"
          initialValue={session?.user.accountId}
          developer
          onSave={login}
        />
      </SettingsSection>
      <SettingsSection title="Chat Settings">
        <TextSettingsField
          name="ChatId"
          description="Select your Chat ID (used for testing)"
          developer
          initialValue={session?.user.chatId}
          onSave={updateChatId}
        />
        <SettingsField name="Switch chat" description={`Select another chat`}>
          <Link
            href="/choose-chat"
            className={`flex h-10 w-full max-w-96 flex-row items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
          >
            Switch chat <ExternalLink size={16}></ExternalLink>
          </Link>
        </SettingsField>
      </SettingsSection>
    </div>
  );
}
