"use client";

import dynamic from "next/dynamic";





function MonthlyCallMinutesReached() {
  return (
    <>
    <div
      id="stripe-bar"
      className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50"
    ></div>
    <div className="max-w-lg mx-auto mt-48 text-center px-8 sm:px-0">
      <div className="text-center">
        <svg
          width="64"
          height="64"
          fill="none"
          stroke="#888"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "inline-block" }}
          className=""
          id=""
        >
          {" "}
          <use xlinkHref="/feather-sprite.svg#alert-circle"></use>{" "}
        </svg>
      </div>

      <div data-cy="big-message-title" className="mt-6 text-xl font-bold">
      Monthly Limit Reached
      </div>

      <div className="mt-6 text-base text-justify leading-6">
      You have reached your monthly minutes limit. Your call limit will
          reset at the start of next month. To resume taking calls right away,
          upgrade your plan{" "}
          <a href="/billing/choose_plan" className="text-blue-500">
            here
          </a>
          .
      </div>
    </div>
  </>
 
  );
}

export default MonthlyCallMinutesReached;
