"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1Account from "./Step1Account";
import Step2Business from "./Step2Business";
import Step3Payment from "./Step3Payment";
import Step4Confirmation from "./Step4Confirmation";
import { sendRegisterProvider } from "../utils/session";
import { ProviderFormData } from "../utils/typing";
import { initialFormData } from "../utils/utils";

export default function RegisterSteps() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProviderFormData>(initialFormData);
  const router = useRouter();

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex items-center justify-center ">
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
          onContinue={async () => {
            const ok = await sendRegisterProvider(formData);
            if (ok) handleNext();
          }}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <Step4Confirmation
          onFinish={() => router.push("/panel")}
        />
      )}
    </div>
  );
}
