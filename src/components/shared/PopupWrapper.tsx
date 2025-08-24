import React from "react";

export interface PopupWrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
  centered?:boolean;
}

const PopupWrapper: React.FC<PopupWrapperProps> = ({ isOpen, children, centered}) => {
  if (!isOpen) return null;

  let position = centered? "items-center" : "items-start";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen">

        <div className={`w-full h-full bg-transparent flex justify-center md:items-center rounded-lg shadow-lg p-6 overflow-auto ${position}`}>
          {children}
        </div>
    </div>
  );
};

export default PopupWrapper;
