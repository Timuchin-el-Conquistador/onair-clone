"use client";

import dynamic from "next/dynamic";

import { Caller } from "@/lib/types/call";

import "@/styles/calls/session.scss";

import Link from "next/link";

import DeletingExpiredSessionWarning from "@/components/modals/expired-session-remove-attempt-warning";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useSessionStore } from "@/providers/session";

const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js")
);
const SlRelativeTime = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/relative-time/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

type PageProps = {
  caller: Caller;
  linkName: string;
  callId: string;
  callStartedTime: string;
  callAnsweredTime: string;
  callEndedTime: string;
  duration: number;
  callStatus: string;
  answeredBy:string
  declinedBy:string
};

function Details(props: PageProps) {
  const router = useRouter();

  const [attemptingToDeleteSession, setAttemptingToDeleteSessionModalState] =
    useState(false);

  const { removeInactiveCall } = useSessionStore((state) => state);

  // Step 2: Parse the date
  const date = new Date(
    props.callEndedTime.replace(/(\d+)(st|nd|rd|th)/, "$1")
  );

  // Step 3: Convert to ISO 8601 format
  const isoDate = date.toISOString();

  const deleteSession = async (callId: string) => {
    removeInactiveCall(callId, router);
  };

  return (
    <div id="session" className="p-6">
      <div className="bg-white p-6">
        <div>
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex overflow-y-scroll remove-scroll">
              <Link
                href={`/calls/${props.callId}`}
                className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-blue-500 border-blue-300 
						"
              >
                Details
              </Link>{" "}
              <Link
                href={`/calls/${props.callId}/recording`}
                className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-gray-500 
						"
              >
                Recording
              </Link>
                            <Link
                href={`/calls/${props.callId}/voicemail`}
                className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-gray-500 
						"
              >
                Voicemail
              </Link>
            </nav>
          </div>
        </div>{" "}
        <div>
          <table className="details-table">
            <tbody>
              <tr>
                <td>Name</td> <td>{props.caller.fullName}</td>
              </tr>
              {props.caller.email != null && (
                <tr>
                  <td>E-mail</td> <td>{props.caller.email}</td>
                </tr>
              )}
              {props.caller.phone != null && (
                <tr>
                  <td>E-mail</td> <td>{props.caller.phone}</td>
                </tr>
              )}
              <tr>
                <td>Device</td>
                <td>
                  {props.caller.country}, {props.caller.countryCode} (
                  <small>
                    {props.caller.info.browser},{" "}
                    {props.caller.info.operatingSystem},{" "}
                    {props.caller.info.device}
                  </small>
                  )
                </td>
              </tr>{" "}
              <tr>
                <td colSpan={2}>
                  <div className="divider"></div>
                </td>
              </tr>{" "}
              <tr>
                <td>Link</td>{" "}
                <td>
                  <a href="#">{props.linkName}</a>
                </td>
              </tr>{" "}
              <tr>
                <td>Identifier</td> <td>{props.callId}</td>
              </tr>{" "}
              {props.callStatus == "ended" && (
                <>
                  <tr>
                    <td>Answered By</td> <td> {props.answeredBy}</td>
                  </tr>
                  <tr>
                    <td>Date</td> <td>{<SlRelativeTime date={isoDate!} />}</td>
                  </tr>
                  <tr>
                    <td>Duration</td> <td>{props.duration} minutes</td>
                  </tr>
                </>
              )}
              {props.callStatus == "declined" && (
                <>
                  <tr>
                    <td>Declined by</td> <td> {props.declinedBy}</td>
                  </tr>
                  <tr>
                    <td>Date</td> <td>{<SlRelativeTime date={isoDate!} />}</td>
                  </tr>
                  <tr>
                    <td>Duration</td> <td>{props.duration} minutes</td>
                  </tr>
                </>
              )}
              <tr>
                <td colSpan={2}>
                  <div className="divider"></div>
                </td>
              </tr>
            </tbody>
          </table>{" "}
          <div className="mt-2.5 ml-4 max-w-[700px]">
            <ol className="relative border-s border-gray-200">
              <SlTooltip
                content="Jan 24, 2025 @ 08:13am UTC"
                placement="right-start"
                className="text-xs"
              >
                <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                  <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                    {props.callStartedTime}
                  </time>{" "}
                  <h3 className="text-gray-900 text-small">Call started</h3>
                </li>
              </SlTooltip>
              {props.callStatus == "ended" && (
                <SlTooltip
                  content="Jan 24, 2025 @ 08:13am UTC"
                  placement="right-start"
                  className="text-xs"
                >
                  <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                    <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                      {props.callAnsweredTime}
                    </time>{" "}
                    <h3 className="text-gray-900 text-small">
                      Answered by {props.answeredBy}
                    </h3>
                  </li>
                </SlTooltip>
              )}

              {props.callStatus == "declined" && (
                <SlTooltip
                  content="Jan 24, 2025 @ 08:13am UTC"
                  placement="right-start"
                  className="text-xs"
                >
                  <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                    <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                      {props.callEndedTime}
                    </time>{" "}
                    <h3 className="text-gray-900 text-small">
                      Declined by {props.declinedBy}
                    </h3>
                  </li>
                </SlTooltip>
              )}
              <SlTooltip
                content="Jan 24, 2025 @ 08:16am UTC"
                placement="right-start"
                className="text-xs"
              >
                <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                  <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                    {props.callEndedTime}
                  </time>{" "}
                  <h3 className="text-gray-900 text-small">Call ended</h3>
                </li>
              </SlTooltip>
            </ol>
          </div>
        </div>
      </div>{" "}
      <div className="text-right mt-4">
        <button
          className="inline-block text-xs text-red-600 hover:text-red-800"
          onClick={() => {
            setAttemptingToDeleteSessionModalState(true);
          }}
        >
          Delete Session
        </button>
      </div>
      <DeletingExpiredSessionWarning
        attemptingToDeleteSession={attemptingToDeleteSession}
        cancel={() => {
          setAttemptingToDeleteSessionModalState(false);
        }}
        proceedDeletingSession={() => {
          setAttemptingToDeleteSessionModalState(false);

          deleteSession(props.callId);
        }}
      />
    </div>
  );
}

export default Details;
