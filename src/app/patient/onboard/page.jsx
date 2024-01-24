"use client";
import Button from "@/components/Button/Button";
import CustomDialog from "@/components/Dialog/Dialog";
import CircleStepper from "@/components/Stepper/MobileStepper";
import Stepper from "@/components/Stepper/Stepper";
import { Transition } from "@headlessui/react";
import { useEffect, useReducer, useState, Fragment } from "react";
import "../../globals.css";
import MedicalHistory from "./form/MedicalHistory";
import Payment from "./form/Payment";
import PersonalInfoForm from "./form/PersonalInfo";
import { ApiSubmission } from "./DialogContent";
import { useToast } from "@/components/Toast/ToastProvider";

function Page() {
  const formInitalValue = {
    name: "",
    height: "",
    weight: "",
    age: "",
    phone_number: "",
    address: "",

    reason_for_visit: "",
    past_medical_condition: "",
    surgeries: "",

    fee_per_visit: "",
    payment_frequency: "",
  };

  const requiredFields = [
    "name",
    "phone_number",
    "reason_for_visit",
    "fee_per_visit",
    "payment_frequency",
  ];

  const stepMappings = {
    name: 1,
    phone_number: 1,
    reason_for_visit: 2,
    fee_per_visit: 3,
    payment_frequency: 3,
  };

  const phoneNumberRegex = /^[789]\d{9}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const { addToast } = useToast();

  const [form, updateForm] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { ...formInitalValue }
  );

  const [formError, updateFormError] = useReducer(
    (state, action) => {
      const { target } = action || {};
      const { name, value } = target || {};

      let errorMsg = "";
      let updated;

      switch (name) {
        case "name":
          errorMsg =
            value === ""
              ? " Please fill out this field."
              : !nameRegex.test(value)
              ? "This field can't have special characters or numbers"
              : "";
          return {
            ...state,
            [name]: !nameRegex.test(value),
            [`${name}ErrorMsg`]: errorMsg,
          };

        case "phone_number":
          errorMsg =
            value === ""
              ? " Please fill out this field."
              : !phoneNumberRegex.test(value)
              ? "Please provide a valid phone number"
              : "";
          return {
            ...state,
            [name]: !phoneNumberRegex.test(value),
            [`${name}ErrorMsg`]: errorMsg,
          };
        case "reason_for_visit":
          updated = value === "" ? true : false;
          return { ...state, reason_for_visit: updated };

        case "fee_per_visit":
          updated = value === "" ? true : false;
          return { ...state, fee_per_visit: updated };

        case "payment_frequency":
          updated = value === "" ? true : false;
          return { ...state, payment_frequency: updated };

        default:
          return action;
      }
    },
    {
      name: false,
      phone_number: false,
      // Add additional form fields with their initial states if needed
    }
  );

  const [formStatus, updateFormStatus] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      stepperValue: [],
      currentStep: 1,
      activeStepValue: 0,
      stepText: ["Personal Info", "Medical", "Payment"],
    }
  );

  const [submitForm, submitProgress] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "OPEN_DIALOG":
          return {
            ...state,
            showModel: action.payload,
          };
        case "ClOSE_DIALOG":
          return {
            ...state,
            showModel: action.payload,
          };
      }
    },
    {
      showModel: {
        open: false,
        title: "",
        content: <ApiSubmission />,
        handleClose: () => handleModelClose(),
      },
    }
  );

  const handleModelClose = () => {
    submitProgress({
      type: "ClOSE_DIALOG",
      payload: {
        open: false,
        content: "",
        handleClose: () => handleModelClose(),
        title: "",
      },
    });
  };

  const steps = ["Personal Info", "Medical", "Done"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const numSteps = 3;
  const maxValue = 65;

  function generateSteps(numSteps, maxValue) {
    const steps = [];
    const stepSize = Math.floor(maxValue / numSteps);

    for (let i = 1; i <= numSteps; i++) {
      const stepValue = stepSize * i;
      const multipleOfFive = Math.floor(stepValue / 5) * 5;
      steps.push(multipleOfFive);
    }
    const stepperValue = form.stepperValue;
    updateFormStatus({ ...formStatus, stepperValue: steps });
    return steps;
  }

  const checkForErrors = () => {
    if (requiredFields.some((field) => form[field] === "")) {
      return false;
    }

    if (formError.name && formError.phone_number) {
      return false;
    } else if (!formError.name && !formError.phone_number) {
      return true;
    } else {
      return true;
    }
  };

  const changeStepValue = (action) => {
    if (action === "next") {
      const stepValue =
        formStatus.currentStep < numSteps
          ? formStatus.currentStep + 1
          : formStatus.currentStep;
      updateFormStatus({ ...formStatus, currentStep: stepValue });
    }
    if (action === "prev") {
      const stepValue =
        formStatus.currentStep > 1
          ? formStatus.currentStep - 1
          : formStatus.currentStep;
      updateFormStatus({ ...formStatus, currentStep: stepValue });
    }
    if (action === "finish") {
      const isRequiredFieldEmpty = checkForErrors();
      if (isRequiredFieldEmpty) {
        handleSubmitForm();
      } else {
        const whichFieldAreEmpty = requiredFields.filter(
          (field) => form[field] === ""
        );

        const stepsWithEmptyFields = whichFieldAreEmpty.map(
          (field) => stepMappings[field]
        );

        const maxStep = Math.min(...stepsWithEmptyFields);

        updateFormStatus({ ...formStatus, currentStep: maxStep });

        const errorObject = {};

        whichFieldAreEmpty.forEach((field) => {
          errorObject[field] = true;
        });
        updateFormError(errorObject);
        addToast("An error has been identified in the following fields", {
          type: "error",
        });
      }
    }
  };

  const getProgressValue = () => {
    return formStatus.stepperValue[formStatus.currentStep - 1];
  };

  async function handleSubmitForm() {
    submitProgress({
      type: "OPEN_DIALOG",
      payload: {
        open: true,
        content: <ApiSubmission />,
        handleClose: () => handleModelClose(),
        title: "Submitting details",
      },
    });
    const submitProgressOfApi = await fetch("/api/patients", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (submitProgressOfApi.ok) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        handleModelClose();
        updateForm({ ...formInitalValue });
        updateFormStatus({ ...formStatus, currentStep: 1 });
        const responseData = await submitProgressOfApi.json();
      } catch (error) {
        console.error("Error during delay or model close:", error);
      }
    } else {
      console.error("Error submitting form:", submitProgressOfApi.statusText);
    }
  }

  useEffect(() => {
    const progressValue = getProgressValue();
    updateFormStatus({ ...formStatus, activeStepValue: progressValue });
  }, [formStatus.currentStep, formStatus.stepperValue]);

  useEffect(() => {
    generateSteps(numSteps, maxValue);
  }, []);

  return (
    <div>
      <div className="px-6">
        {
          <>
            <div className="sm:hidden bg-white p-4 rounded-lg flex items-center justify-between drop-shadow-md">
              <CircleStepper
                progress={formStatus.activeStepValue}
                steps={`${formStatus.currentStep} of 3`}
              />
              <div>
                <p className="font-bold">
                  {formStatus.stepText[formStatus.currentStep - 1]}
                </p>
                {formStatus.currentStep === numSteps ? (
                  <p className="font-light text-emerald-600">Finish</p>
                ) : (
                  <p className="font-light">
                    Next: {formStatus.stepText[formStatus.currentStep]}
                  </p>
                )}
              </div>
            </div>

            <div className="hidden sm:block">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                complete={complete}
              >
                Hello
              </Stepper>
            </div>
          </>
        }
      </div>
      {formStatus.currentStep === 1 ? (
        <Transition
          key="step-1"
          appear
          show={formStatus.currentStep === 1}
          enter="transition-transform transition-opacity ease-out duration-300"
          enterFrom="transform translate-x-full opacity-0"
          enterTo="transform translate-x-0 opacity-100"
          leave="transition-transform transition-opacity ease-in duration-300"
          leaveFrom="transform translate-x-0 opacity-100"
          leaveTo="transform translate-x-full opacity-0"
        >
          <PersonalInfoForm
            initalData={form}
            changeFunction={updateForm}
            blurFunction={updateFormError}
            error={formError}
          />
        </Transition>
      ) : formStatus.currentStep === 2 ? (
        <Transition
          key="step-2"
          appear
          show={formStatus.currentStep === 2}
          enter="transition-transform transition-opacity ease-out duration-300"
          enterFrom="transform translate-x-full opacity-0"
          enterTo="transform translate-x-0 opacity-100"
          leave="transition-transform transition-opacity ease-in duration-300"
          leaveFrom="transform translate-x-0 opacity-100"
          leaveTo="transform translate-x-full opacity-0"
        >
          <MedicalHistory
            initalData={form}
            changeFunction={updateForm}
            error={formError}
            blurFunction={updateFormError}
          />
        </Transition>
      ) : (
        <Transition
          key="step-3"
          appear
          show={formStatus.currentStep === 3}
          enter="transition-transform transition-opacity ease-out duration-300"
          enterFrom="transform translate-x-full opacity-0"
          enterTo="transform translate-x-0 opacity-100"
          leave="transition-transform transition-opacity ease-in duration-300"
          leaveFrom="transform translate-x-0 opacity-100"
          leaveTo="transform translate-x-full opacity-0"
        >
          <Payment
            initalData={form}
            changeFunction={updateForm}
            error={formError}
            blurFunction={updateFormError}
          />
        </Transition>
      )}

      <div className="fixed bottom-20 w-full flex justify-between px-6 bg-white py-4 mr-4">
        {/* <button onClick={showToast}>Show</button> */}
        <Button
          variant={`${formStatus.currentStep === 1 ? "disabled" : "default"}`}
          onClick={() => changeStepValue("prev")}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            changeStepValue(
              formStatus.currentStep === numSteps ? "finish" : "next"
            )
          }
        >
          {formStatus.currentStep === numSteps ? "Finish" : "Next"}
        </Button>
      </div>
      <CustomDialog model={submitForm.showModel} />
    </div>
  );
}

export default Page;
