import Input from "@/components/Form/Input";
import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import Autocomplete from "react-google-autocomplete";
import { ChevronDown } from "lucide-react";

function PersonalInfoForm({ initalData, changeFunction, blurFunction, error }) {
  let errorMsg = "Please fill out this field.";

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
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <Input
            label={"Height"}
            name={"height in feet"}
            placeholder={"height in feet"}
            type={"number"}
            value={initalData.height.split(" ")[0]}
            onChange={(e) =>
              changeFunction({ height: `${e.target.value} feet` })
            }
          />
        </div>
        <div className="grid-cols-subgrid">
          <Input
            label={"Weight"}
            name={"weight"}
            placeholder={"weight in kg"}
            type={"number"}
            value={initalData.weight.split(" ")[0]}
            onChange={(e) => changeFunction({ weight: `${e.target.value} kg` })}
          />
        </div>
        <div className="grid-cols-subgrid">
          <div className="px-3 w-full flex flex-col mb-6  md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Gender
            </p>
            <Listbox
              value={initalData.gender}
              onChange={(e) => {
                changeFunction({ gender: e });
                blurFunction({ ...error, gender: false });
              }}
              name={"gender"}
            >
              {({ open }) => (
                <>
                  <Listbox.Button
                    className={`px-3 w-full h-12 bg-gray-200 text-gray-700 border rounded py-3  mb-3 leading-tight focus:outline-none ${
                      open ? "bg-white" : ""
                    } text-left flex justify-between capitalize ${
                      error.gender && "border-red-500"
                    } `}
                  >
                    {initalData.gender === "" ? "Gender" : initalData.gender}
                    <ChevronDown
                      className={`${
                        open
                          ? "rotate-180 transition delay-100"
                          : "rotate-360 transition delay-100"
                      }`}
                    />
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-20 max-h-60 p-4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-300 focus:outline-non">
                      <Listbox.Option value={"Male"}>Male</Listbox.Option>
                      <Listbox.Option value={"Female"}>Female</Listbox.Option>
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
            {error.gender && (
              <p className="text-red-500 text-xs italic">{errorMsg}</p>
            )}
          </div>
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
