"use client";
import React from "react";
import { useToast } from "./ToastProvider";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/tailwindMerge";

const Variants = cva(
  "p-3 flex items-center justify-start rounded-lg drop-shadow-xl  text-white m-2 relative gap-4",
  {
    variants: {
      variant: {
        success: "bg-emerald-500 ",
        error: "bg-rose-500",
        info: "bg-cyan-500",
        warning: "bg-amber-500",
        default: "bg-gray-400",
      },
      size: {
        default: "h-auto py-2 px-4",
      },
      position: {
        top: "",
        left: "left-2 bottom-40",
        right: "",
        bottom: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    //   position: "left",
    },
  }
);

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container absolute bottom-10 right-5 z-50">
      {toasts.map((toast) => {
        let variant = toast?.config?.type;
        let className = "toast";
        return (
          <div
            key={toast.id}
            className={`${cn(Variants({ variant, className }))}`}
          >
            <button onClick={() => removeToast(toast.id)}>&times;</button>
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
