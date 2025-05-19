"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

interface ModalConfirmarFormula {
    onClose: () => void;
}
const ModalConfirmarFormula = ({ onClose }: ModalConfirmarFormula) => {
    const router = useRouter()
    const redirectProveedores = () => {
        router.push("/proveedores")
    }
    return (
        <div className="fixed inset-0 bg-[#240E25]/75 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[var(--hueso)] p-6 rounded-[10px] shadow-md w-full max-w-md text-center">
                <h2 className="text-xl font-semibold mb-4">¡Tu esencia ha sido embotellada bajo la luna!</h2>
                <p>Ahora vive en una fragancia que susurra quién sos.</p>
                <div className="flex flex-col justify-center items-center mt-6 w-full gap-6">
                    {/* retocar estilos */}
                    <button

                        className="bg-[var(--lila)] hover:bg-[var(--violeta)] text-white  py-[15px] rounded-[10px]  transition w-full cursor-pointer"
                    >
                        Diseña tu botella gratis (opcional)
                    </button>
                    <button
                        onClick={redirectProveedores}
                        className="bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-full cursor-pointer"
                    >
                        Buscar proveedores
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmarFormula