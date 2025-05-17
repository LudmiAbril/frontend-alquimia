import React from 'react'
import Biblioteca from './Biblioteca'

const Confeccion = () => {
    return (
        <div className='flex flex-col items-center bg-[20px]'>

            <h1 className='fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4'>CREANDO FRAGANCIA</h1>
            {/* barra pasos */}
            <div className='flex items-center mb-10'>
                <img src="/icono-pocion-inicio.svg" alt="" />
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <img src="/icono-pocion-final.svg" alt="" />
            </div>

            {/* frasco + titulo del paso + biblioteca */}
            <div className='flex justify-center gap-[80px]'>
                <div className='flex flex-col items-center gap-[50px]'>
                    <PasoCard />
                    <img src="/frasco-diseño.svg" alt="" />
                </div>
                <Biblioteca />
            </div>

        </div>
    )
}

export default Confeccion

export const PasoCard = () => {
    return (<div className='bg-white p-6 rounded-[10px] items-center flex flex-col w-[409px] h-[179px] shadow-md'>
        <img src="/icono-info.svg" alt="info" className='mb-[18px]' />
        <h3 className='mb-[10px]'>PASO 1 - NOTA DE FONDO</h3>
        <p>Profunda, duradera... la estela que perdura.</p>
    </div>)
}