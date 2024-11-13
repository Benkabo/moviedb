import React, { ReactNode } from "react";

interface SmoothModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SmoothModal: React.FC<SmoothModalProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className={`w-full max-w-4xl transform rounded-2xl bg-white shadow-xl transition-all duration-300 ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-h-[90vh] overflow-y-auto">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmoothModal;
