"use client";

const PreparationSteps = () => (
    <div className="w-[38rem]">
        <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Pasos para construir tu perfume</p>
        <div className="mt-10 flex flex-col items-left justify-center ml-[2rem] text-[14px] text-[var(--gris4)]">
            <div className="flex justify-between mb-6 px-6">
                <p>
                    1. En tu recipiente, mezclá las <span className="font-bold">esencias</span> según el porcentaje indicado en la tabla.
                </p>
            </div>
            <div className="flex justify-between mb-6 px-6">
                <p>
                    2. Diluir la mezcla con el porcentaje indicado de <span className="font-bold">alcohol etílico + agua destilada.</span>
                </p>
            </div>
            <div className="flex justify-between mb-6 px-6">
                <p>
                    3. Dejar <span className="font-bold">macerar</span> la mezcla entre 1 a 3 días.
                </p>
            </div>
            <div className="flex justify-between mb-6 px-6">
                <p>4. Tu fragancia ya está lista para usarse!</p>
            </div>
        </div>
    </div>
);
export default PreparationSteps;