import { toast } from "./use-toast";

export const showCreateToast = (message: string, title?: string) => {
  toast({
    title: title || "Created",
    description: message,
    variant: "create",
    duration: 5000,
  });
};

export const showUpdateToast = (message: string, title?: string) => {
  toast({
    title: title || "Updated",
    description: message,
    variant: "update",
    duration: 5000,
  });
};

export const showDeleteToast = (message: string, title?: string) => {
  toast({
    title: title || "Deleted",
    description: message,
    variant: "delete",
    duration: 5000,
  });
};

export const showInfoToast = (message: string, title?: string) => {
  toast({
    title: title || "Info",
    description: message,
    variant: "info",
    duration: 5000,
  });
};