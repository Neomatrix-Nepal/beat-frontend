import React from "react";

const LoadingEffect = () => {
  return (
    <div className="fixed inset-0 bg-black/70 z-90">
      <div
        className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-20 h-20 rounded-full border-4 border-amber-50 border-t-[#E04AA3] border-b-transparent animate-spin"
      ></div>
    </div>
  );
};

export default LoadingEffect;
