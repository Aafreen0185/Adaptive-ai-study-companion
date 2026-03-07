"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FloatingLabelInput({ label, className, ...props }: Props) {
  const id = React.useId();
  const [hasValue, setHasValue] = React.useState(Boolean(props.value ?? props.defaultValue));

  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        {...props}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          props.onChange?.(e);
        }}
        className={cn(
          "peer h-14 w-full rounded-[22px] border border-border bg-card/70 px-4 pt-4 text-sm outline-none backdrop-blur",
          "focus:ring-2 focus:ring-primary/25"
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all",
          "peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-foreground/80",
          hasValue ? "top-4 -translate-y-0 text-xs" : ""
        )}
      >
        {label}
      </label>
    </div>
  );
}

