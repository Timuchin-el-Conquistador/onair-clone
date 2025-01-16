"use client";

import dynamic from "next/dynamic";

import { useEffect, useRef, useState } from "react";

import { Schedule } from "@/utils/dtos/availability";
import TimeSelect from "./Dropdown/time-select";




type PageProps = {
  availability: string,
  changeAvailability:(availability:string) => void
}

function DailyAvailability(props:PageProps) {
  const [isAvailabilityDopdownVisible, setAvailabilityDropdownVisibility] =
    useState(false);
  /*const [schedule, setSchedule] = useState<Schedule>({
    monday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: true,
    },
    tuesday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: true,
    },
    wednesday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: true,
    },
    thursday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: true,
    },
    friday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: true,
    },
    saturday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: false,
    },
    sunday: {
      availability: { start: "09:00 AM", end: "04:00 PM" },
      isActive: false,
    },
  });*/


    const elementRef = useRef<HTMLUListElement|null>(null)
  
    const handleOutsideClick = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        setAvailabilityDropdownVisibility(false); // Close or perform an action
      }
    };
  
    useEffect(() => {
      // Add event listener to detect clicks
      document.addEventListener("mousedown", handleOutsideClick);
  
      // Cleanup the event listener
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

 /* const toggleDayActivation = (
    day: keyof Schedule, // Ensures the day is one of the keys of Schedule (monday, tuesday, etc.)
    checked: boolean // The value will be a string representing the time
  ) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        isActive: checked,
      },
    }));
  };
  const handleTimeChange = (
    day: keyof Schedule, // Ensures the day is one of the keys of Schedule (monday, tuesday, etc.)
    type: "start" | "end", // Specifies that the type is either 'start' or 'end'
    value: string // The value will be a string representing the time
  ) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        availability: {
          ...prevSchedule[day].availability,
          [type]: value,
        },
      },
    }));
  };

  const isValidTimeRange = (start: string, end: string) => {
    if (start && end) {
      // Convert start and end times to Date objects to compare
      const startTime = new Date(`01/01/2023 ${start}`);
      const endTime = new Date(`01/01/2023 ${end}`);

      return startTime <= endTime;
    }
    return false;
  };*/

  return (
    <div className="lg:flex w-full">
      <div className="lg:w-1/2">
        <label className="font-medium text-md">Daily availability</label>{" "}
        <p className="text-xs text-gray-400 md:pr-4 mb-2 lg:mb-auto">
          Control your online/offline status. When set to 'Scheduled', the link
          status follows availability rules.
        </p>
      </div>{" "}
      <div id="daily-availability" className="lg:w-1/2">
        <div className="h-9">
          <div
            className="status-select h-[38px]"
            style={{ maxWidth: "100%", width: "100%" }}
          >
            <div className="relative h-full">
              <button
                type="button"
                className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer"
                onClick={() => setAvailabilityDropdownVisibility(true)}
              >
                <span className="flex items-center">
                  <span
                    className={`status-dot mr-3 ${
                      props.availability == "online"
                        ? "online"
                        //: props.availability == "scheduled"
                      //  ? "auto"
                        : "offline"
                    }`}
                  ></span>{" "}
                  <span className="text-gray-600 leading-none text-sm">
                    {      props.availability == "online"
                        ? "Online"
                        //: props.availability == "scheduled"
                      //  ? "Scheduled"
                        : "Offline"}
                  </span>
                </span>{" "}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  {" "}
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </button>{" "}
              <ul
                tabIndex={-1}
                role="listbox"
                className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm py-1"
                style={{
                  maxHeight: "225px",
                  display: isAvailabilityDopdownVisible ? "block" : "none",
                }}
                ref={elementRef}
              >
                <li
                  id="option1"
                  role="option"
                  className="relative flex items-center select-none py-2 pr-4 hover:bg-gray-100 text-gray-900 cursor-pointer pl-3"
                  style={{ fontSize: "14px" }}
                  onClick={() =>{
                    setAvailabilityDropdownVisibility(false)
                    props.changeAvailability('online')
                  }}
                >
                  <span className="status-dot online mr-3"></span>{" "}
                  <span className="block truncate">Online</span>{" "}
                </li>
                <li
                  id="option2"
                  role="option"
                  className="relative flex items-center select-none py-2 pr-4 hover:bg-gray-100 text-gray-900 cursor-pointer pl-3"
                  style={{ fontSize: "14px" }}
                  onClick={() =>{
                    setAvailabilityDropdownVisibility(false)
                    props.changeAvailability('offline')
                  }}
                >
                  <span className="status-dot offline mr-3"></span>{" "}
                  <span className="block truncate">Offline</span>{" "}
                </li>
                {/*<li
                  id="option3"
                  role="option"
                  className="relative flex items-center select-none py-2 pr-4 hover:bg-gray-100 text-gray-900 cursor-pointer pl-3"
                  style={{ fontSize: "14px" }}
                  onClick={() =>{
                    setAvailabilityDropdownVisibility(false)
                    props.changeAvailability('scheduled')
                  }}
                >
                  <span className="status-dot auto mr-3"></span>{" "}
                  <span className="block truncate">Scheduled</span>{" "}
                </li>*/}
              </ul>
            </div>
          </div>
        </div>{" "}
        <br />
        <br />{" "}
        {props.availability == 'scheduled' &&   <div>
          {/*} <div className="mb-2 mt-6 flex items-center text-xs">
            <p className="text-gray-800">Timezone:</p>{" "}
            <div
              className="ml-2 h-[38px]"
              style={{ maxWidth: "100%", width: "100%" }}
            >
              {" "}
              <div className="relative h-full">
                <button
                  type="button"
                  className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer"
                >
                  <div
                    className="truncate text-gray-600"
                    style={{ fontSize: "14px;" }}
                  >
                    Asia/Baku
                  </div>{" "}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {" "}
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </button>{" "}
              </div>
            </div>
          </div>{" "}*/}
         {/*} <ul>
            {Object.keys(schedule).map((el: string, i: number) => (
              <li id="availability-item" className="items-center mb-2" key={i}>
                <div className="flex items-center w-24 lg:w-full">
                  <SlCheckbox
                    size="small"
                    className="leading-6 text-xs w-full small-checkbox inline-block"
                    checked={schedule[el as keyof Schedule].isActive}
                    onSlChange={(event) => {
                      const checked = (event.target as HTMLInputElement)
                        .checked;
                      toggleDayActivation(el as keyof Schedule, checked);
                    }}
                  >
                    <span className="block truncate">
                      {el.charAt(0).toUpperCase() + el.slice(1)}
                    </span>
                  </SlCheckbox>
                </div>{" "}
                <div className="flex items-center">
                  <label className="info-text">from</label>{" "}
                  <TimeSelect
                    filterValue={
                      schedule[el as keyof Schedule].availability.start
                    }
                    isActive={schedule[el as keyof Schedule].isActive}
                    day={el as keyof Schedule}
                    type="start"
                    handleTimeChange={handleTimeChange}
                  />
                  <label className="info-text">to</label>{" "}
                  <TimeSelect
                    filterValue={
                      schedule[el as keyof Schedule].availability.end
                    }
                    isActive={schedule[el as keyof Schedule].isActive}
                    day={el as keyof Schedule}
                    type="end"
                    handleTimeChange={handleTimeChange}
                  />
                  <SlTooltip
                    content="Incorrect range. End time must be after the start time."
                    className="text-sm"
                    style={{ maxWidth: "200px" }}
                  >
                    {isValidTimeRange(
                      schedule[el as keyof Schedule].availability.start,
                      schedule[el as keyof Schedule].availability.end
                    ) ? null : (
                      <SlIcon
                        name="exclamation-circle"
                        aria-hidden="true"
                        library="default"
                        className="text-red-500 ml-2"
                      ></SlIcon>
                    )}
                  </SlTooltip>
                </div>
              </li>
            ))}
          </ul>
          <a className="text-blue-700 mt-2 text-sm cursor-pointer">
            + Add daily break
          </a>*/}
        </div>}
      </div>
    </div>
  );
}

export default DailyAvailability;
