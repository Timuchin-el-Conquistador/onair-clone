"use client";

import dynamic from "next/dynamic";

import "@/styles/table.scss";

import { Call } from "@/lib/types/call";

import { Caller } from "@/lib/types/call";

const SlButton = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    //   loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlBadge = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/badge/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const SlRelativeTime = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/relative-time/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

type ComponentProps = {
  calls: Call[];
  openCall: (callId: string) => void;
  openDrawer: (
    sessionId: string,
    slug: string,
    callStartedTime: string,
    caller: Caller
  ) => void;
};

function Table(props: ComponentProps) {
  return (
    <>
      <div id="sessions" className="mb-6 mx-0 sm:mx-0 hidden sm:block">
        <div id="table-container">
          <table>
            <thead>
              <tr>
                <td>Visitor</td>
                <td>Duration</td>
                <td className="hidden lg:table-cell">Link</td>
                <td className="hidden lg:table-cell">Since</td>
                <td>Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {props.calls.map((call: Call) => {
                // Step 1: Remove the ordinal suffix (e.g., "nd")

                const cleanedDateString = call.callStartedTime.replace(
                  /(\d+)(st|nd|rd|th)/,
                  "$1"
                );

                // Step 2: Parse the date
                const date = new Date(cleanedDateString);

                // Step 3: Convert to ISO 8601 format
                const isoDate = date.toISOString();

                return (
                  <tr key={call._id}>
                    <td className="truncate">
                      <b className="truncate">{call.callerInfo.fullName}</b>
                      <span className="text-gray-500 text-xs lg:text-sm block w-full truncate">
                        {call.callerInfo.email}
                      </span>
                    </td>
                    <td className="truncate">
                      <b>{Math.round(call.duration / 60)}</b>
                      <span className="text-gray-500 text-xs lg:text-sm block w-full truncate">
                        minute(s)
                      </span>
                    </td>
                    <td className="hidden lg:table-cell truncate">
                      <b>{call.link.linkName}</b>
                      <span className="text-gray-500 text-xs lg:text-sm block w-full truncate">
                        {call.slug}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell truncate">
                      <b>
                        <SlRelativeTime date={isoDate} />
                      </b>
                    </td>
                    <td className="text-left truncate">
                      {call.callStatus == "live" && (
                        <SlBadge variant="success" className="inline-block">
                          {call.callStatus}
                        </SlBadge>
                      )}
                      {call.callStatus == "waiting" && (
                        <SlBadge variant="primary" className="inline-block">
                          {call.callStatus}
                        </SlBadge>
                      )}
                    </td>
                    <td>
                      <SlButton
                        size="small"
                        variant="default"
                        data-optional=""
                        data-valid=""
                        onClick={() => {
                          if (
                            call.callStatus == "live" ||
                            call.callStatus == "waiting"
                          ) {
                            // Step 2: Parse the date
                            const date = new Date(
                              call.callStartedTime.replace(
                                /(\d+)(st|nd|rd|th)/,
                                "$1"
                              )
                            );

                            // Step 3: Convert to ISO 8601 format
                            const isoDate = date.toISOString();
                            props.openDrawer(
                              call._id,
                              call.slug,
                              isoDate,
                              call.callerInfo
                            );
                            return;
                          }
                          props.openCall(call._id);
                        }}
                      >
                        Details
                      </SlButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 mb-12 mx-0 sm:mx-0 sm:hidden">
        <ul className="rounded-lg mt-2 divide-y divide-gray-200 overflow-hidden shadow">
          {props.calls.map((call: Call) => (
            <li
              key={call._id}
              onClick={() => {
                props.openCall(call._id);
              }}
            >
              <div className="block px-4 py-4 bg-white hover:bg-gray-50">
                <span className="flex items-center space-x-4">
                  <span className="flex-1 flex space-x-2 truncate">
                    <span className="flex flex-col text-gray-900 text-sm truncate">
                      <span className="truncate block w-full font-semibold">
                        {call.callerInfo.fullName}
                      </span>{" "}
                      {call.callerInfo.email && (
                        <span className="truncate block w-full text-gray-500">
                          {call.callerInfo.email}
                        </span>
                      )}
                      <span className="truncate block w-full text-gray-500">
                        Meeting with China, a few seconds ago
                      </span>
                    </span>
                  </span>{" "}
                  <span>
                    <SlBadge
                      variant={
                        call.callStatus == "live" ? "success" : "primary"
                      }
                      className="inline-block"
                    >
                      {call.callStatus}
                    </SlBadge>
                  </span>{" "}
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    className="flex-shrink-0 h-7 w-7 text-gray-400"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#chevron-right"></use>
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/*<div id="sessions" className="mb-12 mx-0 sm:mx-0 sm:hidden">
        <ul className="rounded-lg mt-2 divide-y divide-gray-200 overflow-hidden shadow">
          <li>
            <div className="block px-4 py-4 bg-white hover:bg-gray-50">
              <span className="flex items-center space-x-4">
                <span className="flex-1 flex space-x-2 truncate">
                  <span className="flex flex-col text-gray-900 text-sm truncate">
                    <span className="truncate font-semibold">Magush</span>{" "}
                    <span className="truncate text-gray-500">
                      test@gmail.com
                    </span>{" "}
                    <span className="truncate text-gray-500">
                      Meeting with Cingiz, 1 minutes
                    </span>
                  </span>
                </span>{" "}
                <span></span>{" "}
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  className="flex-shrink-0 h-7 w-7 text-gray-400"
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#chevron-right"></use>
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </div>{" "}*/}
      {/*} <SlDialog
        label="Download Records"
        className="dialog-deny-close with-header"
        style={{ width: "520px" }}
      >
        <div className="mt-2 flex items-center text-gray-700 w-full">
          <span className="mr-5 w-1/5 sm:text-base text-sm">Date Range: </span>{" "}
          <div className="text-sm" style={{ maxWidth: "80%", width: "80%" }}>
            {" "}
            <div className="relative h-full">
              <button
                type="button"
                className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer shadow-sm"
              >
                <div
                  className="truncate text-gray-600"
                  style={{ fontSize: "14px" }}
                >
                  Last 7 days
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
        </div>{" "}
        <div className="text-gray-700" style={{ display: "none" }}>
          <div className="flex mt-4 items-center w-full">
            <span className="mr-5 w-1/5 sm:text-base text-sm">Start Date:</span>{" "}
            <div className="vdp-datepicker">
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="Select start date"
                  readOnly
                  className="custom-datepicker-styling sm:h-9 h-8"
                />{" "}
              </div>{" "}
              <div
                className="vdp-datepicker__calendar"
                style={{ display: "none" }}
              >
                {" "}
                <header>
                  <span className="prev">&lt;</span>{" "}
                  <span className="day__month_btn up">Dec 2024</span>{" "}
                  <span className="next">&gt;</span>
                </header>{" "}
                <div className="">
                  <span className="cell day-header">Sun</span>
                  <span className="cell day-header">Mon</span>
                  <span className="cell day-header">Tue</span>
                  <span className="cell day-header">Wed</span>
                  <span className="cell day-header">Thu</span>
                  <span className="cell day-header">Fri</span>
                  <span className="cell day-header">Sat</span>{" "}
                  <span className="cell day weekend sun">1</span>
                  <span className="cell day">2</span>
                  <span className="cell day">3</span>
                  <span className="cell day">4</span>
                  <span className="cell day">5</span>
                  <span className="cell day">6</span>
                  <span className="cell day weekend sat">7</span>
                  <span className="cell day weekend sun">8</span>
                  <span className="cell day">9</span>
                  <span className="cell day">10</span>
                  <span className="cell day">11</span>
                  <span className="cell day">12</span>
                  <span className="cell day">13</span>
                  <span className="cell day weekend sat">14</span>
                  <span className="cell day weekend sun">15</span>
                  <span className="cell day">16</span>
                  <span className="cell day">17</span>
                  <span className="cell day">18</span>
                  <span className="cell day">19</span>
                  <span className="cell day">20</span>
                  <span className="cell day weekend sat">21</span>
                  <span className="cell day weekend sun">22</span>
                  <span className="cell day">23</span>
                  <span className="cell day">24</span>
                  <span className="cell day">25</span>
                  <span className="cell day">26</span>
                  <span className="cell day today">27</span>
                  <span className="cell day weekend sat">28</span>
                  <span className="cell day weekend sun">29</span>
                  <span className="cell day">30</span>
                  <span className="cell day">31</span>
                </div>
              </div>{" "}
              <div
                className="vdp-datepicker__calendar"
                style={{ display: "none" }}
              >
                {" "}
                <header>
                  <span className="prev">&lt;</span>{" "}
                  <span className="month__year_btn up">2024</span>{" "}
                  <span className="next">&gt;</span>
                </header>{" "}
                <span className="cell month">January</span>
                <span className="cell month">February</span>
                <span className="cell month">March</span>
                <span className="cell month">April</span>
                <span className="cell month">May</span>
                <span className="cell month">June</span>
                <span className="cell month">July</span>
                <span className="cell month">August</span>
                <span className="cell month">September</span>
                <span className="cell month">October</span>
                <span className="cell month">November</span>
                <span className="cell month">December</span>
              </div>{" "}
              <div
                className="vdp-datepicker__calendar"
                style={{ display: "none" }}
              >
                {" "}
                <header>
                  <span className="prev">&lt;</span> <span>2020 - 2029</span>{" "}
                  <span className="next">&gt;</span>
                </header>{" "}
                <span className="cell year">2020</span>
                <span className="cell year">2021</span>
                <span className="cell year">2022</span>
                <span className="cell year">2023</span>
                <span className="cell year">2024</span>
                <span className="cell year">2025</span>
                <span className="cell year">2026</span>
                <span className="cell year">2027</span>
                <span className="cell year">2028</span>
                <span className="cell year">2029</span>
              </div>
            </div>
          </div>{" "}
          <div className="flex mt-4 items-center w-full">
            <span className="mr-5 w-1/5 sm:text-base text-sm">End Date:</span>{" "}
            <div className="vdp-datepicker">
              <div className="">
                {" "}
                <input
                  type="text"
                  placeholder="Select end date"
                  readOnly
                  className="custom-datepicker-styling sm:h-9 h-8"
                />{" "}
              </div>{" "}
              <div
                className="vdp-datepicker__calendar"
                style={{ display: "none" }}
              >
                {" "}
                <header>
                  <span className="prev">&lt;</span>{" "}
                  <span className="day__month_btn up">Dec 2024</span>{" "}
                  <span className="next">&gt;</span>
                </header>{" "}
                <div>
                  <span className="cell day-header">Sun</span>
                  <span className="cell day-header">Mon</span>
                  <span className="cell day-header">Tue</span>
                  <span className="cell day-header">Wed</span>
                  <span className="cell day-header">Thu</span>
                  <span className="cell day-header">Fri</span>
                  <span className="cell day-header">Sat</span>{" "}
                  <span className="cell day weekend sun">1</span>
                  <span className="cell day">2</span>
                  <span className="cell day">3</span>
                  <span className="cell day">4</span>
                  <span className="cell day">5</span>
                  <span className="cell day">6</span>
                  <span className="cell day weekend sat">7</span>
                  <span className="cell day weekend sun">8</span>
                  <span className="cell day">9</span>
                  <span className="cell day">10</span>
                  <span className="cell day">11</span>
                  <span className="cell day">12</span>
                  <span className="cell day">13</span>
                  <span className="cell day weekend sat">14</span>
                  <span className="cell day weekend sun">15</span>
                  <span className="cell day">16</span>
                  <span className="cell day">17</span>
                  <span className="cell day">18</span>
                  <span className="cell day">19</span>
                  <span className="cell day">20</span>
                  <span className="cell day weekend sat">21</span>
                  <span className="cell day weekend sun">22</span>
                  <span className="cell day">23</span>
                  <span className="cell day">24</span>
                  <span className="cell day">25</span>
                  <span className="cell day">26</span>
                  <span className="cell day today">27</span>
                  <span className="cell day weekend sat">28</span>
                  <span className="cell day weekend sun">29</span>
                  <span className="cell day">30</span>
                  <span className="cell day">31</span>
                </div>
              </div>{" "}
              <div
                className="vdp-datepicker__calendar"
                style={{ display: "none" }}
              >
                {" "}
                <header>
                  <span className="prev">&lt;</span>{" "}
                  <span className="month__year_btn up">2024</span>{" "}
                  <span className="next">&gt;</span>
                </header>{" "}
                <span className="cell month">January</span>
                <span className="cell month">February</span>
                <span className="cell month">March</span>
                <span className="cell month">April</span>
                <span className="cell month">May</span>
                <span className="cell month">June</span>
                <span className="cell month">July</span>
                <span className="cell month">August</span>
                <span className="cell month">September</span>
                <span className="cell month">October</span>
                <span className="cell month">November</span>
                <span className="cell month">December</span>
              </div>{" "}
              <div
                className="vdp-datepicker__calendar"
                style={{ display: "none" }}
              >
                {" "}
                <header>
                  <span className="prev">&lt;</span> <span>2020 - 2029</span>{" "}
                  <span className="next">&gt;</span>
                </header>{" "}
                <span className="cell year">2020</span>
                <span className="cell year">2021</span>
                <span className="cell year">2022</span>
                <span className="cell year">2023</span>
                <span className="cell year">2024</span>
                <span className="cell year">2025</span>
                <span className="cell year">2026</span>
                <span className="cell year">2027</span>
                <span className="cell year">2028</span>
                <span className="cell year">2029</span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="mb-8 flex mt-4 items-center text-gray-700 w-full">
          <span className="mr-5 w-1/5 sm:text-base text-sm">Pages: </span>{" "}
          <div className="text-sm" style={{ maxWidth: "80%", width: "80%" }}>
            {" "}
            <div className="relative h-full">
              <button
                type="button"
                className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer shadow-sm"
              >
                <div
                  className="truncate text-gray-600"
                  style={{ fontSize: "14px" }}
                >
                  All Links
                </div>{" "}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
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
        </div>{" "}
        <div className="py-2">
          <span className="block text-xs mb-2 h-4 text-gray-600"></span>{" "}
          <a href="/calls/download?page_slug=all&amp;start_date=2024-12-20 00:00:00 UTC&amp;end_date=2024-12-27 23:59:59 UTC">
            <SlButton
              variant="primary"
              size="medium"
              data-optional=""
              data-valid=""
              className="flex items-center px-24 sm:px-36"
            >
              Download
            </SlButton>
          </a>
        </div>
      </SlDialog>{" "}*/}
      {/*<SlDrawer
        no-header=""
        label=""
        placement="end"
        className="drawer-overview"
      >
        <div>
          <SlAlert open={false} variant="primary">
            <SlIcon
              slot="icon"
              name="info-circle"
              aria-hidden="true"
              library="default"
            ></SlIcon>
            No session selected. Select one and try again.
          </SlAlert>
        </div>{" "}
        <div slot="footer" className="flex justify-between">
          <span>
            <SlButton
              variant="text"
              size="medium"
              data-optional=""
              data-valid=""
            >
              <SlIcon
                name="arrow-left"
                aria-hidden="true"
                library="default"
              ></SlIcon>{" "}
              Back
            </SlButton>
          </span>{" "}
          <span className="mr-4">
            <SlButton
              variant="danger"
              size="medium"
              data-optional=""
              data-valid=""
            >
              Delete
            </SlButton>
          </span>
        </div>
      </SlDrawer>*/}
    </>
  );
}

export default Table;
