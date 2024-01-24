import Input from "@/components/Form/Input";
import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import { ChevronDown } from "lucide-react";

function Payment({ initalData, changeFunction, error, blurFunction }) {
  let errorMsg = "Please fill out this field.";

  return (
    <div className="bg-white mx-6 mt-4 py-4 rounded-lg drop-shadow-md h-full">
      <div className="flex items-center">
        <Input
          label={"Fee per visit"}
          placeholder={500}
          type={"number"}
          name={"fee_per_visit"}
          value={initalData.fee_per_visit}
          onChange={(e) => changeFunction({ fee_per_visit: e.target.value })}
          isError={error.fee_per_visit}
          onBlur={blurFunction}
        />
        <div className="px-3 w-full flex flex-col mb-6  md:mb-0">
          <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Payment Frequency
          </p>
          <Listbox
            value={initalData.payment_frequency}
            onChange={(e) => {
              changeFunction({ payment_frequency: e });
              blurFunction({ ...error, payment_frequency: false });
            }}
            name={"payment_frequency"}
          >
            {({ open }) => (
              <>
                <Listbox.Button
                  className={`px-3 w-full h-12 bg-gray-200 text-gray-700 border rounded py-3  mb-3 leading-tight focus:outline-none ${
                    open ? "bg-white" : ""
                  } text-left flex justify-between capitalize ${
                    error.payment_frequency && "border-red-500"
                  } `}
                >
                  {initalData.payment_frequency === ""
                    ? "Fee paid"
                    : initalData.payment_frequency}
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
                    <Listbox.Option value={"daily"}>Daily</Listbox.Option>
                    <Listbox.Option value={"weekly"}>Weekly</Listbox.Option>
                    <Listbox.Option value={"Monthly"}>Monthly</Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
          {error.payment_frequency && (
            <p className="text-red-500 text-xs italic">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
