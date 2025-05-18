import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 hover:bg-white hover:text-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
        destructive:
          "bg-red-600 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 hover:bg-red-700 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
        outline:
          "border-4 border-black bg-white text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
        secondary:
          "bg-gray-200 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 hover:bg-gray-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
        ghost: "hover:bg-gray-100 text-black",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-5 text-base",
        sm: "h-9 rounded-md gap-1.5 px-4 py-2 has-[>svg]:px-3 text-sm",
        lg: "h-12 rounded-md px-8 py-4 has-[>svg]:px-6 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
