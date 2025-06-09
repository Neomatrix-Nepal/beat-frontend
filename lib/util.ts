import { toast } from "./use-toast";

export const showCreateToast = (message: string, title?: string,product?: string) => {
  toast({
    title: title || "Created",
    description: message,
   product,
    variant: "create",
    duration: 5000,
  });
};

export const showUpdateToast = (message: string, title?: string,product?: string) => {
  toast({
    title: title || "Updated",
    description: message,
   product,
    variant: "update",
    duration: 5000,
  });
};

export const showDeleteToast = (message: string, title?: string,product?: string) => {
  toast({
    title: title || "Deleted",
    description: message,
     product,
    variant: "delete",
    duration: 5000,
  });
};

export const showInfoToast = (message: string, title?: string,product?: string) => {
  toast({
    title: title || "Info",
    description: message,
    product,
    variant: "info",
    duration: 5000,
  });
};