// components/shared/PopupWrapper.tsx
import React from "react";

export default function PopupWrapper({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative bg-[#0f0f10] p-4 rounded-xl w-full max-w-4xl border border-[#333]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-400"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
