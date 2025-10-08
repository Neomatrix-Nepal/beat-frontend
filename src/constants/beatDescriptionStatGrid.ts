import { Crown, FileText, Pencil, SlidersHorizontal } from "lucide-react";

export const statConfig= [
    {
        title: "Standard",
        key: "standard",
        icon: FileText,
        iconColor: "bg-[#00B894]",
        valueColor: "text-[#00B894]",
    },
    {
        title: "Premium",
        key: "premium",
        icon: Crown,
        iconColor: "bg-[#FF7675]",
        valueColor: "text-[#FF7675]",
    },
    {
        title: "Custom Pro",
        key: "custom-beat",
        icon: Pencil,
        iconColor: "bg-[#6C5CE7]",
        valueColor: "text-[#6C5CE7]",
    },
    {
        title: "Mixing Pro",
        key: "mixing-pro",
        icon: SlidersHorizontal,
        iconColor: "bg-[#FFEAA7]",
        valueColor: "text-[#FFEAA7]",
    },
];