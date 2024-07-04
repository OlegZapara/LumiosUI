"use client";
import { useEffect, useState } from "react";
import SettingsField from "@/components/settings/settings-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type TextSettingsFieldProps = {
  name: string;
  description: string;
  developer?: boolean;
  admin?: boolean;
  onSave: (value: any) => Promise<any>;
  initialValue?: string | number;
};

export default function TextSettingsField(props: TextSettingsFieldProps) {
  const [value, setValue] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    let initialValue = props.initialValue;
    if (typeof props.initialValue == "number") {
      initialValue = props.initialValue.toString();
    }
    setValue((initialValue as string) || "");
  }, [props.initialValue]);

  function onSave() {
    props.onSave(parseInt(value)).then(() => {
      toast({
        title: `${props.name} was updated`,
        description: `${props.name} is set to ${value}`,
      });
    });
  }

  return (
    <SettingsField {...props}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
      />
      <Button variant="outline" className="w-full sm:w-32" onClick={onSave}>
        Save
      </Button>
    </SettingsField>
  );
}
