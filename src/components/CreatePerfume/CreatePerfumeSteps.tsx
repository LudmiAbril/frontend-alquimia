"use client";

import { useCreatePerfume } from "@/context/CreatePerfumeContext";
import SectionWrapper from "../General/SectionWrapper";
import Welcome from "./Welcome";
import CreatePerfume from "./PerfumeCreation";
import FormulaResult from "./FormulaResult";
import { createSteps } from "../utils/utils";


const CreatePerfumeSteps = () => {
  const {
    currentStep,
    setCurrentStep,
  } = useCreatePerfume();

  const advanceStep = () => {
    if (currentStep < createSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const returnStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return <Welcome onNext={advanceStep} />;
    }

    if (currentStep < createSteps.length - 1) {
      return (
        <CreatePerfume
          onNext={advanceStep}
          onBack={returnStep}
        />
      );
    }

    return <FormulaResult />;
  };

  return <SectionWrapper className="bg-[#E8E3DE]">{renderStep()}</SectionWrapper>;
};

export default CreatePerfumeSteps;
