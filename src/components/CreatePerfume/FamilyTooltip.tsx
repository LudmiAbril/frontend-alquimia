"use client";

import Image from "next/image";
import { FamilyInfo } from "../utils/typing";

interface FamilyTooltipProps {
    family: string;
    info:
    FamilyInfo
    | undefined;
    loading: boolean;
}

const FamilyTooltip = ({ family, info, loading }: FamilyTooltipProps) => (
    <div className="absolute top-full w-[16rem] mt-2 p-4 bg-[var(--hueso)] text-black rounded-[10px] shadow  z-10 flex gap-6">
        {info?.Image1 && (
            <Image src={info.Image1 as string} alt="icono" width={50} height={50} />
        )}
        <div className="w-full text-left"><h4 className="text-[var(--violeta)] font-roboto uppercase mb-2 text-[0.9rem]">{family}</h4>
            <p className="text-xsm font-roboto text-[var(--gris3)] font-ligth mt-1 ">{loading ? "Cargando..." : info?.Description}</p></div>
    </div>
);

export default FamilyTooltip;
