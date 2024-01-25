"use client";
import Switch from "@/components/Switch/Switch";
import PatientTask from "@/components/VisitingTask/PatientTask";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect, useReducer } from "react";
import "../globals.css";
import CustomDialog from "@/components/Dialog/Dialog";
import { EditVisitInfo } from "./dialogContent";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/assests/icon/PhysioIcon/Loading";

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
        case "VISIT_DATA":
          return {
            ...state,
            noData: false,
            visitForData: action.payload,
          };
        case "NO_DATA":
          return {
            ...state,
            visitForData: action.payload,
            noData: true,
          };
        case "CHANGE_PENDING_VISIT":
          const visitId = action.payload;
          const updatedPendingVisits = state.visitForData.pendingVisits.filter(
            (visit) => visit._id !== visitId
          );

          const completedVisit = state.visitForData.pendingVisits.find(
            (visit) => visit._id === visitId
          );
          return {
            ...state,
            noData: false,
            visitForData: {
              pendingVisits: updatedPendingVisits,
              completedVisits: [
                ...state.visitForData.completedVisits,
                { ...completedVisit, isComplete: true },
              ],
            },
          };
        case "CHANGE_COMPLETED_VISIT":
          const visitIdForComplete = action.payload;
          const updatedCompletedVisits =
            state.visitForData.completedVisits.filter(
              (visit) => visit._id !== visitIdForComplete
            );

          const pendingVisit = state.visitForData.completedVisits.find(
            (visit) => visit._id === visitIdForComplete
          );

          return {
            ...state,
            noData: false,
            visitForData: {
              completedVisits: updatedCompletedVisits,
              pendingVisits: [
                ...state.visitForData.pendingVisits,
                { ...pendingVisit, isComplete: false },
              ],
            },
          };
      }
    },
    {
      date: today,
      visitForData: {},
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

  // const fetchVisitForSelectedDate = async () => {
  //   const fetchForYear = new Date().getFullYear();
  //   const fetchForMonth = new Date().getMonth();
  //   const formattedDate = `${fetchForYear}-${fetchForMonth + 1}-${
  //     pageInfo.date
  //   }`;

  //   const submitProgressOfApi = await axios
  //     .get(`/api/visits/per_day_visit/?date=${formattedDate}`)
  //     .then((resp) => {
  //       const pendingVisits = resp.data.visitsForTheDate.filter(
  //         (visit) => !visit.isComplete
  //       );
  //       const completedVisits = resp.data.visitsForTheDate.filter(
  //         (visit) => visit.isComplete
  //       );
  //       setPageInfo({
  //         type: "VISIT_DATA",
  //         payload: {
  //           pendingVisits,
  //           completedVisits,
  //           data: resp.data.visitsForTheDate,
  //         },
  //       });
  //     });
  // };
  const queryKey = ["visits", pageInfo.date];
  const { isLoading, error, data, isFetching } = useQuery(
    queryKey,
    async () => {
      const fetchForYear = new Date().getFullYear();
      const fetchForMonth = new Date().getMonth();
      const formattedDate = `${fetchForYear}-${fetchForMonth + 1}-${
        pageInfo.date
      }`;

      const response = await axios.get(
        `/api/visits/per_day_visit/?date=${formattedDate}`
      );
      const pendingVisits = response.data.visitsForTheDate.filter(
        (visit) => !visit.isComplete
      );
      const completedVisits = response.data.visitsForTheDate.filter(
        (visit) => visit.isComplete
      );

      return {
        pendingVisits,
        completedVisits,
        data: response.data.visitsForTheDate,
      };
    }
  );

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

  const visitStatusChange = async (action, visitID) => {
    let type =
      action === "fromCompleted"
        ? "CHANGE_COMPLETED_VISIT"
        : "CHANGE_PENDING_VISIT";
    setPageInfo({ type: type, payload: visitID });
    await axios.put("/api/visits/per_day_visit", {
      _id: visitID,
      markAs: type === "CHANGE_COMPLETED_VISIT" ? false : true,
    });
  };

  useEffect(() => {
    const activeIndex = daysArray.indexOf(pageInfo.date);

    if (carouselRef.current && activeIndex !== -1) {
      carouselRef.current.scrollLeft =
        carouselRef?.current?.children[activeIndex]?.offsetLeft - 150;
    }
  }, [today, daysArray, pageInfo.date]);

  // useEffect(() => {
  //   fetchVisitForSelectedDate();
  // }, [pageInfo.date]);

  useEffect(() => {
    if (!isLoading && !error) {
      console.log("data", data);
      setPageInfo({
        type: data.data.length ? "VISIT_DATA" : "NO_DATA",
        payload: data,
      });
    }
  }, [data, isLoading, error, setPageInfo]);

  return (
    <div style={{ height: "calc(100vh - 60px)" }}>
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
        {isLoading ? (
          <div className="flex justify-center flex-col items-center gap-4 mt-4 h-full max-h-[65vh] ">
            <Loading />
            <p>Fetching your daily visit details. Please wait.</p>
          </div>
        ) : (
          <Tab.Panels className="h-full max-h-[65vh] overflow-auto">
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
                {pageInfo?.visitForData?.pendingVisits?.map((data, index) => {
                  return (
                    <div
                      className="px-4 drop-shadow-md w-full task-list flex flex-col mt-2 gap-2 transition duration-300 ease-out"
                      key={index}
                    >
                      <PatientTask
                        openTaskModel={handleModelState}
                        data={data}
                        visitStatusChange={visitStatusChange}
                        type="fromPending"
                      />
                    </div>
                  );
                })}
                {!pageInfo?.visitForData?.pendingVisits?.length &&
                  !pageInfo.noData && (
                    <div className="h-full flex justify-center font-semibold max-h-[65vh] w-full px-4">
                      <h3 className="text-2xl text-center ">
                        All the visits for completed for the day
                        <div className="flex justify-center">
                          <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
                            alt="Party Popper"
                            width="50"
                            height="50"
                          />
                        </div>
                      </h3>
                    </div>
                  )}
                {pageInfo.date > today && pageInfo.noData && (
                  <div className="h-full flex justify-center font-semibold max-h-[65vh] w-full px-4">
                    <h3 className="text-2xl text-center ">
                      Oops, you've selected a future date. Visits cannot be
                      accessed for future dates.
                    </h3>
                  </div>
                )}
                {pageInfo.date < today && pageInfo.noData && (
                  <div className="h-full flex justify-center font-semibold max-h-[65vh] w-full px-4">
                    <h3 className="text-2xl text-center ">
                      Oops, the system didn't find any visits for the selected
                      date.
                    </h3>
                  </div>
                )}
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
                {pageInfo?.visitForData?.completedVisits?.map((data, index) => {
                  return (
                    <div
                      className="px-4 drop-shadow-md w-full task-list flex flex-col mt-2 gap-2 transition duration-300 ease-in"
                      key={index}
                    >
                      <PatientTask
                        openTaskModel={handleModelState}
                        data={data}
                        visitStatusChange={visitStatusChange}
                        type="fromCompleted"
                      />
                    </div>
                  );
                })}
                {!pageInfo?.visitForData?.completedVisits?.length &&
                  !pageInfo.noData && (
                    <div className="h-full flex justify-center font-semibold max-h-[65vh] w-full">
                      <h3 className="text-2xl text-center ">
                        No visit has been complete yet
                      </h3>
                    </div>
                  )}
                {pageInfo.date > today && pageInfo.noData && (
                  <div className="h-full flex justify-center font-semibold max-h-[65vh] w-full px-4">
                    <h3 className="text-2xl text-center ">
                      Oops, you've selected a future date. Visits cannot be
                      accessed for future dates.
                    </h3>
                  </div>
                )}
                {pageInfo.date < today && pageInfo.noData && (
                  <div className="h-full flex justify-center font-semibold max-h-[65vh] w-full px-4">
                    <h3 className="text-2xl text-center ">
                      Oops, the system didn't find any visits for the selected
                      date.
                    </h3>
                  </div>
                )}
              </Transition>
            </Tab.Panel>
          </Tab.Panels>
        )}
      </Tab.Group>
      <CustomDialog model={pageInfo.showModel} />
    </div>
  );
}

export default Page;
