import { Input } from "../ui/input";
import * as React from "react";
import { forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isFocused: boolean;
  errors: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props: TextInputProps, ref) {
    const { isFocused, errors, ...otherProps } = props;
    const invalidClassName = "border-red-500 focus-visible:ring-red-500";

    return (
      <Input
        {...otherProps}
        ref={ref}
        autoFocus={isFocused}
        className={`px-2 w-full ${errors && invalidClassName}`}
        size={1}
      />
    );
  },
);
