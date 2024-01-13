import { useState } from "react";

function useMultipleForms(forms = []) {
  const FIRST_INDEX = 0;
  const [currentFormIndex, setCurrentFormIndex] = useState(FIRST_INDEX);
  const lastIndex = forms.length - 1;

  const next = () => {
    currentFormIndex !== lastIndex && setCurrentFormIndex((prev) => prev + 1);
  };

  const back = () => {
    currentFormIndex !== FIRST_INDEX && setCurrentFormIndex((prev) => prev - 1);
  };

  const goto = (step) => {
    currentFormIndex >= FIRST_INDEX && currentFormIndex <= lastIndex && setCurrentFormIndex(step);
  };

  return {
    steps: forms,
    step: forms[currentFormIndex],
    next,
    back,
    goto,
    isFirstStep: currentFormIndex === FIRST_INDEX,
    isLastStep: currentFormIndex === lastIndex,
  };
}

export default useMultipleForms;
