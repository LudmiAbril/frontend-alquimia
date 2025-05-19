import React from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-[var(--hueso)] p-6 rounded-xl w-[90%] max-w-[400px] relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">×</button>
        {children}
      </div>
    </div>
  );
}
