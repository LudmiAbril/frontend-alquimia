"use client"
import React, { useState } from 'react'

interface Biblioteca {
  pasoActual: number;
  onConfirm: () => void;
}
const Biblioteca = ({ pasoActual, onConfirm }: Biblioteca) => {
  const seleccionDeNotas = pasoActual >= 1 && pasoActual <= 3;

  const titulo = seleccionDeNotas ? "Biblioteca de notas" : "Intensidad";
  const subtitulo = seleccionDeNotas
    ? "Arrastrá una nota de fondo al frasco para dar el primer soplo de tu fragancia."
    : "Elige un tipo de intensidad para tu perfume.";

  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center p-[2.31rem] rounded-[10px] shadow-md text-center">
      <p className='fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold'>{titulo}</p>
      <p className='italic mb-4 w-[527px] text-[var(--gris4)] text-[14px]'>{subtitulo}</p>
      {/*buscador */}
      {seleccionDeNotas === true && (
        <div className="flex w-full gap-2">
          <input
            type="text"
            className="border border-black rounded-[10px] w-full p-1"
          />
          <button className="bg-[var(--violeta)] px-8 rounded-[10px] text-white text-xs">
            FILTROS
          </button>
        </div>
      )}

      {/* caja de notas */}
      <div className='max-h-full w-full'>
        {/* una x cada familia olfativa, ver como se renderizara esto con el handle filterchange... */}
        {
          seleccionDeNotas ? (
            <ContenedorNotas />
          ) : (
            <ContenedorIntensidades />
          )
        }
      </div>
    </div>
  )
}

export default Biblioteca

// estos datos se usaran para mockear, las familias talvez si queden para agrupar con la respuesta del back, pero las notas tendran q estar en un estado con interfaz desde el back. Modelar interfaz nota
export const ContenedorNotas = () => {
  const familias = [
    "Frutal",
    "Ahumado",
    "Alcanforado",
    "Aldehídico",
    "Almizclado",
    "Amaderado",
    "Ámbar",
    "Cítrico",
    "Empolvado",
    "Especiado",
    "Floral",
    "Gourmand",
    "Herbal",
    "Hierbas aromáticas",
    "Marino",
    "Mentolado",
    "Terroso"
  ];

  const notas = [
    "vainilla", "lavanda", "chocolate", "limon", "coco", "menta", "cereza", "ciruela"
  ]

  return (
    <div className="overflow-y-scroll max-h-[31rem] mt-6 w-full flex flex-col">
      {familias.map((familia) => (
        < div key={familia} className="flex flex-col mb-[2.43rem]" >
          {/* titulo de la familia */}
          <div className="flex items-center gap-2 mb-2 fuente-principal">
            <p className="text-[var(--gris3)] text-[20px] font-medium">{familia}</p>
            <span className="text-xs bg-[var(--gris3)] rounded-full px-2 py-0.5 text-white font-bold">i</span>
          </div>
          {/*notas de esta familia */}
          <div className=" w-100 flex flex-wrap gap-[25px]">
            {notas.map((nota, index) => (<button key={index} className='cursor-pointer bg-[#E2708A] hover:bg-[#DD4568] transition-colors duration-100 w-[80px] h-[80px] flex flex-col items-center justify-center rounded-[10px] text-white p-[16px] shadow-md shadow-gray-400'><img src="https://flaticons.net/icon.php?slug_category=miscellaneous&slug_icon=flower" alt="nota" className='w-8 color-white mb-2' /><p className='text-[12px] font-semibold'>{nota}</p></button>))}
          </div>
        </div>
      ))
      }
    </div >
  );
};

export const ContenedorIntensidades = () => {
  return (<div></div>)
}
