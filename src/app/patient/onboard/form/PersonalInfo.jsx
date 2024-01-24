import Input from "@/components/Form/Input";
import React from "react";
import Autocomplete from "react-google-autocomplete";

function PersonalInfoForm({ initalData, changeFunction,blurFunction,error }) {
  return (
    <div className="bg-white mx-6 mt-4 py-4 rounded-lg drop-shadow-md h-full">
      <Input
        label={"Name"}
        placeholder={"Arun Patel"}
        type={"text"}
        name={"name"}
        value={initalData.name}
        onChange={(e) => changeFunction({ name: e.target.value })}
        onBlur={blurFunction}
        isError={error.name}
        errorMsg={error.nameErrorMsg}
      />
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <Input
            label={"Height"}
            name={"height in feet"}
            placeholder={"height in feet"}
            type={"number"}
            value={initalData.height.split(' ')[0]}
            onChange={(e) =>
              changeFunction({ height: `${e.target.value} feet` })
            }
          />
        </div>
        <div className=" grid-cols-subgrid">
          <Input
            label={"Weight"}
            name={"weight"}
            placeholder={"weight in kg"}
            type={"number"}
            value={initalData.weight.split(' ')[0]}
            onChange={(e) => changeFunction({ weight: `${e.target.value} kg` })}
          />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_3fr]">
        <div className="col-span-1">
          <Input
            label={"Age"}
            name={"age"}
            value={initalData.age}
            placeholder={"18"}
            type={"number"}
            onChange={(e) => changeFunction({ age: e.target.value })}
          />
        </div>
        <div className=" grid-cols-subgrid">
          <Input
            label={"Phone Number"}
            value={initalData.phone_number}
            name={"phone_number"}
            placeholder={"xxxxxxxxxx"}
            type={"number"}
            onChange={(e) => changeFunction({ phone_number: e.target.value })}
            onBlur={blurFunction}
            isError={error.phone_number}
            errorMsg={error.phoneErrorMsg}
          />
        </div>
      </div>
      <Input
        label={"Address"}
        name={"address"}
        value={initalData.address}
        placeholder={"Address of the patient"}
        type={"text"}
        onChange={(e) => changeFunction({ address: e.target.value })}
      />
      {/* <Autocomplete
      apiKey={"AIzaSyBDdOL23sa-ZOhDZoUlvlF_oACBmyWF_Io"}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
      options={{
        types: ["address"],
        componentRestrictions: { country: "ind" },
      }}
    /> */}
    
    </div>
  );
}

export default PersonalInfoForm;
