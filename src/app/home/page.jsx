"use client";
import Switch from "@/components/Switch/Switch";
import PatientTask from "@/components/VisitingTask/PatientTask";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect, useReducer } from "react";
import "../globals.css";
import CustomDialog from "@/components/Dialog/Dialog";
import { EditVisitInfo } from "./dialogContent";

const ara = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Page() {
  const carouselRef = useRef(null);
  const today = new Date().getDate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [pageInfo, setPageInfo] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "UPDATE_DATE":
          return { ...state, date: action.payload };
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
      date: today,
      showModel: {
        open: false,
        title: "",
        content: "",
        handleClose: "",
      },
    }
  );

  const currentDate = new Date();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const monthShortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthShortName = monthShortNames[currentDate.getMonth()];

  const CalenderDate = ({ selected, date }) => {
    return (
      <div
        className={`w-50p h-50p flex ${
          selected ? "bg-primary" : "bg-white"
        } rounded-lg drop-shadow-md items-center justify-center p-8 flex-col`}
        onClick={() => setPageInfo({ type: "UPDATE_DATE", payload: date })}
      >
        <span>{date}</span>
        <span>{currentMonthShortName}</span>
      </div>
    );
  };

  const handleModelClose = () => {
    setPageInfo({
      type: "ClOSE_DIALOG",
      payload: {
        open: false,
        content: "",
        handleClose: () => handleModelClose(),
        title: "",
      },
    });
  };

  const handleModelState = () => {
    setPageInfo({
      type: "OPEN_DIALOG",
      payload: {
        open: true,
        content: (
          <EditVisitInfo
            date={`${pageInfo.date}/${currentMonthShortName}`}
            closeModel={() => handleModelClose()}
          />
        ),
        handleClose: () => handleModelClose(),
        title: "Edit Visit",
      },
    });
  };

  useEffect(() => {
    const activeIndex = daysArray.indexOf(pageInfo.date);

    if (carouselRef.current && activeIndex !== -1) {
      carouselRef.current.scrollLeft =
        carouselRef?.current?.children[activeIndex]?.offsetLeft - 150;
    }
  }, [today, daysArray, pageInfo.date]);

  return (
    <div className="h-full">
      <div className="flex gap-1 overflow-auto py-4 calender" ref={carouselRef}>
        {daysArray.map((day, index) => {
          const selected = day === pageInfo.date ? true : false;
          return (
            <CalenderDate selected={selected} key={`day-${day}`} date={day} />
          );
        })}
      </div>

      <Tab.Group onChange={setSelectedIndex} selectedIndex={selectedIndex}>
        <Tab.List className="py-2 px-4 ">
          {({ selected }) => (
            <div className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-3xl bg-grayAlpha30 p-1">
              <>
                <Tab
                  className={`tab-button flex items-center space-x-[6px] rounded-3xl py-2 px-[18px] text-sm font-normal ${
                    selectedIndex === 0
                      ? "text-CornflowerBlue bg-white drop-shadow"
                      : "text-body-color"
                  }`}
                >
                  Pending
                </Tab>
                <Tab
                  className={`tab-button flex items-center space-x-[6px] rounded-3xl py-2 px-[18px] text-sm font-normal ${
                    selectedIndex === 1
                      ? "text-CornflowerBlue bg-white drop-shadow"
                      : "text-body-color"
                  }`}
                >
                  Completed
                </Tab>
              </>
            </div>
          )}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Transition
              appear
              show={selectedIndex == 0}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="overflow-auto task-list max-h-[65vh] h-full flex flex-col mt-2 gap-2">
                {ara.map((data, index) => (
                  <div className="px-4 drop-shadow-md w-full" key={index}>
                    <PatientTask openTaskModel={handleModelState} />
                  </div>
                ))}
              </div>
            </Transition>
          </Tab.Panel>
          <Tab.Panel>
            <Transition
              appear
              show={selectedIndex == 1}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="overflow-auto task-list max-h-[65vh] h-full flex flex-col mt-2 gap-2">
                {ara.map((data, index) => (
                  <div className="px-4 drop-shadow-md w-full" key={index}>
                    <PatientTask openTaskModel={handleModelState} />
                  </div>
                ))}
              </div>
            </Transition>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <CustomDialog model={pageInfo.showModel} />
    </div>
  );
}

export default Page;
