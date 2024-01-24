import React from "react";
import Input from "@/components/Form/Input";

function MedicalHistory({ initalData, changeFunction,blurFunction,error }) {
  return (
    <div className="bg-white mx-6 mt-4 py-4 rounded-lg drop-shadow-md h-full">
      <Input
        label={"Reason of Visit"}
        placeholder={"Reason for Visit, e.g. knee pain, back pain."}
        type={"text"}
        name={"reason_for_visit"}
        value={initalData.reason_for_visit}
        isError={error.reason_for_visit}
        onBlur={blurFunction}
        onChange={(e) => changeFunction({ reason_for_visit: e.target.value })}
        />
      <Input
        label={"Past Medical Conditions"}
        placeholder={"e.g., diabetes, hypertension"}
        type={"text"}
        name={"medical_condition"}
        value={initalData.medical_condition}
        onChange={(e) => changeFunction({ medical_condition: e.target.value })}
        />
      <Input
        label={"Surgeries/Procedures"}
        placeholder={"Add comma separated surgeries"}
        type={"text"}
        name={"surgeries"}
        value={initalData.surgeries}
        onChange={(e) => changeFunction({ surgeries: e.target.value })}
      />
    </div>
  );
}

export default MedicalHistory;
