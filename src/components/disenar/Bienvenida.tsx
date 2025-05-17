"use client"

import React from "react";

interface BienvenidaProps {
  onNext: () => void;
}

const Bienvenida = ({ onNext }: BienvenidaProps) => {
  return (
    <div>
      <h1 >¡Bienvenido, alquimista!</h1>
      <h3>Comenzá la creación de tu fragancia única.</h3>
      <p>Tu fragancia nace de lo invisible. Conectá aromas, emociones y un toque de magia.</p>
      <button
        onClick={onNext}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label="Comenzar a mezclar"
      >
        <img src="./frasco.svg" alt="Frasco" />
      </button>

      <p>Hacé click y comenzá a mezclar tu hechizo aromático.</p>
    </div>
  );
};

export default Bienvenida;
