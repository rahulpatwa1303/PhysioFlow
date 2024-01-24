import React from "react";
import "./stepper.css";
import { Check, UserRound } from "lucide-react";

function Stepper({ steps,complete,currentStep,children }) {
  return (
    <>
      <div className="flex justify-center">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <Check size={24} /> : i + 1}
            </div>
            <p className="text-gray-500 text-sm">step {i + 1}</p>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {/* {currentStep === steps.length ? "Finish" : "Next"} */}
          {children}
        </button>
      )}
    </>
  );
}

export default Stepper;
