"use client";

import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from "@/src/components/toast";
import { useToast } from "@/src/lib/use-toast";
import { CheckCircle, RefreshCw, Trash2, Info, Pencil } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  const getIcon = (variant: string | undefined) => {
    switch (variant) {
      case "create":
        return <CheckCircle className="h-6 w-6 text-white" />;
      case "update":
        return <Pencil className="h-6 w-6 text-white" />;
      case "delete":
        return <Trash2 className="h-6 w-6 text-white" />;
      case "info":
        return <Info className="h-6 w-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, product, ...props }) => (
        <Toast
          key={id}
          variant={variant}
          {...props}
          className={cn(
            "fixed left-1/2 top-1/2 z-[9999] w-[320px] bg-primary -translate-x-1/2 -translate-y-1/2 transform rounded-2xl border border-white/10 flex justify-center items-center text-center shadow-xl shadow-white/10"
          )}
        >
          <div className="flex flex-col ml-4 items-center w-full justify-center gap-4 ">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-md">
              {getIcon(variant)}
            </div>

            <ToastTitle className="text-lg font-bold tracking-wide text-white">
              <span className="text-zinc-400">{title}</span>
            </ToastTitle>

            <ToastDescription className="text-sm text-zinc-400">
              {description}
            </ToastDescription>

            <div className="w-full space-y-2">
              <button className="w-full rounded-md bg-gradient-to-r from-purple-600 to-pink-500 py-2 text-sm font-medium text-white transition hover:brightness-110">
                {product}
              </button>
              <button
                onClick={() => dismiss(id)}
                className="w-full rounded-md border border-zinc-600 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
