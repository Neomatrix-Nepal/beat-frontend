import React from "react";

export interface PopupWrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const PopupWrapper: React.FC<PopupWrapperProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50   flex items-center justify-center w-screen h-screen">

        <div className="w-full h-full bg-transparent flex justify-center items-start md:items-center rounded-lg shadow-lg p-6 overflow-auto">
          {children}
        </div>
    </div>
  );
};

export default PopupWrapper;
