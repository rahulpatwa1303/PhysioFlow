import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/tailwindMerge";

const Variants = cva("inline-flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default:
        "bg-DodgerBlue text-white hover:brightness-125",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
      outline:
        "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
      subtle:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
      ghost:
        "bg-transparent text-gray-800 hover:bg-gray-200",
      link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent",
      disabled:'bg-gray-300 text-gray-700'
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-2 rounded-md",
      lg: "h-11 px-8 rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({ className, children, variant, size, ...props }) {
  return (
    <button className={cn(Variants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}

export default Button;
