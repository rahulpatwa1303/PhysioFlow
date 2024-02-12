"use client";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import MedicalHistory from "../onboard/form/MedicalHistory";
import Payment from "../onboard/form/Payment";
import PersonalInfoForm from "../onboard/form/PersonalInfo";
import axios from "axios";
import { BrainCircuit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomDialog from "@/components/Dialog/Dialog";
import AiAssisted from "./DialogContent";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useQuery } from "react-query";

function Page() {
  const route = useParams();
  const searchParams = useSearchParams()
  const router = useRouter();
  const formInitalValue = {
    name: "",
    height: "",
    weight: "",
    age: "",
    phone_number: "",
    address: "",
    gender: "",

    reason_for_visit: "",
    past_medical_condition: "",
    surgeries: "",

    fee_per_visit: "",
    payment_frequency: "",
  };

  const [model, setModel] = useReducer(
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
        case "OPEN_TOOLTIP":
          return {
            ...state,
            showToolTip: true,
          };
        case "CLOSE_TOOLTIP":
          return {
            ...state,
            showToolTip: false,
          };
      }
    },
    {
      showModel: {
        open: false,
        title: "",
        content: "",
        handleClose: "",
      },
      showToolTip: false,
    }
  );

  const stateFromUrl = searchParams.get('open')

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FORM_DATA':
        // Ensure data properties match your initial form values
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [form, updateForm] = useReducer(formReducer, formInitalValue);

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

        case "gender":
          updated = value === "" ? true : false;
          return {
            ...state,
            [name]: updated,
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
    }
  );

  const handleModelState = () => {
    setModel({
      type: "CLOSE_TOOLTIP",
    });    
    setModel({
      type: "OPEN_DIALOG",
      payload: {
        open: true,
        content: <AiAssisted data={form.suggestion_from_ai} handleModelClose={handleModelClose}/>,
        handleClose: () => handleModelClose(),
        title: "",
      },
    });
  };

  const handleModelClose = () => {
    setModel({
      type: "ClOSE_DIALOG",
      payload: {
        open: false,
        content: "",
        handleClose: () => handleModelClose(),
        title: "",
      },
    });
  };

  const { user } = route;
  const fetchDatForUser = async () => {
    await axios
      .get(`/api/patients?patient_id=${user}`)
      .then((resp) => {
        let data = resp.data.data[0]
        updateForm({ type: 'SET_FORM_DATA', payload: data }); 
        setModel({
          type: "OPEN_TOOLTIP",
        });
        return data
      });
  };

  const queryKey = ["visits", user];

  const {isLoading,error,data} = useQuery(queryKey,fetchDatForUser)
  console.log('isLoading',isLoading)
  useEffect(() => {
    fetchDatForUser();
  }, []);

  return (
    <div className="max-h-[74vh] overflow-auto">
      <p className="mx-6 font-lg font-semibold">Personal Information</p>
      <PersonalInfoForm
        initalData={form}
        changeFunction={updateForm}
        blurFunction={updateFormError}
        error={formError}
      />
      <div className="flex justify-between items-center flex-row mx-6 mt-6 font-lg font-semibold">
        <p>Medical</p>
        <TooltipProvider>
          <Tooltip open={model.showToolTip}>
            <TooltipTrigger onClick={handleModelState}>
              <BrainCircuit className="animate-pulse cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to open AI protocol</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <MedicalHistory
        initalData={form}
        changeFunction={updateForm}
        blurFunction={updateFormError}
        error={formError}
      />
      <p className="mx-6 mt-6 font-lg font-semibold">Payment</p>
      <Payment
        initalData={form}
        changeFunction={updateForm}
        blurFunction={updateFormError}
        error={formError}
      />
      

      <div className="fixed bottom-20 w-full flex justify-between px-6 bg-white py-4 mr-4">
        <Button
          variant={'ghost'}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          // onClick={() =>
          //   changeStepValue(
          //     formStatus.currentStep === numSteps ? "finish" : "next"
          //   )
          // }
        >
          {/* {formStatus.currentStep === numSteps ? "Finish" : "Next"} */}
          Update
        </Button>
      </div>

      <CustomDialog model={model.showModel} />
    </div>
  );
}

export default Page;
