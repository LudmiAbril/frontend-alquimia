"use client";

import React from 'react'

interface ConfirmBottleDesignModalProps {
    onClose: () => void;
    onConfirm: () => void;
}
const ConfirmBottleDesignModal = ({ onClose, onConfirm }: ConfirmBottleDesignModalProps) => {
    return (
        <div className="fixed inset-0 bg-[#240E25]/75 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[var(--hueso)] p-6 rounded-[10px] shadow-md w-full max-w-md text-center">
                <h2 className="text-principal text-xl text-[var(--gris4)] font-semibold mb-4">Tu diseño esta listo! </h2>
                <p>ahora podes ir a buscar proveedores para tu creacion.</p>
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        onClick={onClose}
                        className="border border-[var(--violeta)]  text-[var(--violeta)] px-4 py-2 rounded rounded-[10px] transition"
                    >
                        Volver
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[var(--violeta)]  hover:bg-[var(--lila)] text-white px-4 py-2 rounded rounded-[10px] transition"
                    >
                        Ir a Proveedores
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmBottleDesignModal