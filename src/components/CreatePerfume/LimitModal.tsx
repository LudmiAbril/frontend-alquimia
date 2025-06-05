"use client";
import React from 'react'

interface LimitModalProps {
    onClose: () => void;
}

const LimitModal = ({ onClose }: LimitModalProps) => {
    return (
        <div className="fixed inset-0 bg-[#240E25]/75 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[var(--hueso)] p-6 rounded-[10px] shadow-md w-full max-w-md text-center">
                <h2 className="text-xl font-semibold mb-4">Alacanzante el limite de notas</h2>
                <p>Solo podes agregar 4 notas por tipo (base, corazon, salida) Podes avazar al siguiente paso o eliminar alguna de la lista si te arrepentiste. </p>
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        onClick={onClose}
                        className="bg-[var(--violeta)] text-white px-4 py-2 rounded hover:bg-[#7a2f96] transition"
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LimitModal