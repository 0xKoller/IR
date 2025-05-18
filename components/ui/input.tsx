import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        "border-4 border-black rounded-md bg-white text-black px-4 py-2 text-base w-full min-w-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none placeholder:text-gray-400",
        "focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-200",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
