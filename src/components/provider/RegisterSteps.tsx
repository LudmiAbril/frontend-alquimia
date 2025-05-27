"use client";

import React, { useState } from 'react'
import Step1Account from './Step1Account';
import Step2Business from './Step2Business';
import Step3Payment from './Step3Payment';
import Step4Confirmation from './Step4Confirmation';

export interface ProviderFormData {
    email: string;
    password: string;
    empresa: string;
    cuil: string;
    productosSeleccionados: string[];
    otroProducto: string;
    rubro: string;
    tarjeta: {
        nombre: string;
        numero: string;
        vencimiento: string;
        cvc: string;
    };
}

const RegisterSteps = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<ProviderFormData>({
        email: "",
        password: "",
        empresa: "",
        cuil: "",
        productosSeleccionados: [] as string[],
        otroProducto: "",
        rubro: "",
        tarjeta: {
            nombre: "",
            numero: "",
            vencimiento: "",
            cvc: "",
        },
    });

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4efeb] px-4">
            {step === 1 && (
                <Step1Account
                    onContinue={handleNext}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {step === 2 && (
                <Step2Business
                    onContinue={handleNext}
                    onBack={handleBack}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {step === 3 && (
                <Step3Payment
                    onContinue={handleNext}
                    onBack={handleBack}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {step === 4 && (
                <Step4Confirmation
                    onFinish={() => console.log("Proceso finalizado")}
                />
            )}
        </div>
    );
}

export default RegisterSteps