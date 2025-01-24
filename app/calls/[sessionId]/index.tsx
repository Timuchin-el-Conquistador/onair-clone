"use client";

import dynamic from "next/dynamic";

import Pulse from "@/components/Loaders/pulse";


import "@/styles/calls/session.scss";

const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
)


function CallSession() {
  return (
    <div id="session" className="p-6">
      <div className="bg-white p-6">
        <div>
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex overflow-y-scroll remove-scroll">
              <a
                href="/calls/Xfz9eFtcl5N8hiry"
                className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-blue-500 border-blue-300 
						"
              >
                Details
              </a>{" "}
              <a
                href="/calls/Xfz9eFtcl5N8hiry/transcription"
                className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-gray-500 
						"
              >
                Transcription
              </a>
            </nav>
          </div>
        </div>{" "}
        <div>
          <table className="details-table">
            <tbody>
              <tr>
                <td>Name</td> <td>Chingiz</td>
              </tr>{" "}
              <tr>
                <td>E-mail</td> <td>test@gmail.com</td>
              </tr>{" "}
              <tr>
                <td>Device</td>{" "}
                <td>
                  Azerbaijan 🇦🇿 <small>(Windows Chrome/132)</small>
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
                  <a href="https://onair.io/testing">TEST</a>
                </td>
              </tr>{" "}
              <tr>
                <td>Identifier</td> <td>Xfz9eFtcl5N8hiry</td>
              </tr>{" "}
              <tr>
                <td>Answered By</td> <td>Cingiz Hamidov</td>
              </tr>{" "}
              <tr>
                <td>Date</td> <td>4 hours ago</td>
              </tr>{" "}
              <tr>
                <td>Duration</td> <td>3 minutes</td>
              </tr>{" "}
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
                    Jan 24, 2025 @ 12:13pm
                  </time>{" "}
                  <h3 className="text-gray-900 text-small">Call started</h3>
                </li>
              </SlTooltip>
              <SlTooltip
                content="Jan 24, 2025 @ 08:13am UTC"
                placement="right-start"
                className="text-xs"
              >
                <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                  <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                    Jan 24, 2025 @ 12:13pm
                  </time>{" "}
                  <h3 className="text-gray-900 text-small">
                    Answered by Cingiz Hamidov
                  </h3>
                </li>
              </SlTooltip>
              <SlTooltip
                content="Jan 24, 2025 @ 08:16am UTC"
                placement="right-start"
                className="text-xs"
              >
                <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                  <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                    Jan 24, 2025 @ 12:16pm
                  </time>{" "}
                  <h3 className="text-gray-900 text-small">Call ended</h3>
                </li>
              </SlTooltip>
            </ol>
          </div>
        </div>
      </div>{" "}
      <div className="text-right mt-4">
        <a
          href="#"
          className="inline-block text-xs text-red-600 hover:text-red-800"
        >
          Delete Session
        </a>
      </div>
    </div>
  );
}

export default CallSession;
