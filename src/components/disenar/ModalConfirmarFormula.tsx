"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PeopleIcon from '@mui/icons-material/People';
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
            <div className="bg-[var(--hueso)] p-6 rounded-[10px] shadow-md  text-center flex flex-col items-center">
                <h2 className="fuente-principal text-[20px] font-bold text-[var(--gris4)] mb-4 uppercase ">¡Tu esencia ha sido embotellada bajo la luna!</h2>
                <p className="text-[var(--gris4)] text-[14px] font-semibold">Ahora vive en una fragancia que susurra quién sos.</p>
                <div className="flex justify-center gap-4 mt-[2rem] flex-col w-[300px]">
                    {/* retocar estilos */}
                    <button

                        className="bg-[var(--lila)] hover:bg-[var(--violeta)] text-white  px-[15px] py-2 rounded-[10px]  transition cursor-pointer  flex justify-center gap-[2px]"
                    >
                        <AutoFixHighIcon />  Diseña tu botella gratis (opcional)
                    </button>
                    <button
                        onClick={redirectProveedores}
                        className="bg-[var(--violeta)] text-white  px-[15px] py-2 w-full rounded-[10px] hover:bg-[var(--lila)] transition  cursor-pointer "
                    >
                        <PeopleIcon />  Buscar proveedores
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmarFormula