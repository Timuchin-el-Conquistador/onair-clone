"use client";

import Link from "next/link";

import "@/styles/calls/index.scss";
import "@/styles/calls/recording.scss";

import { useEffect, useState } from "react";

import { AudioLoadingSkeletonPulse } from "@/components/Loaders/pulse";

type PageProps = {
  callId: string;
  planName: string;
  retrieveVoicemail: (callId: string) => Promise<{
    status: number;
    message: string;
    voicemailUrl:string|null
  }>;
};

function Recording(props: PageProps) {
  const [recordUrl, setRecordUrl] = useState<string>();
  const [loading, setLoadingState] = useState(false);
  const [errpr, setErrorMessage] = useState(false);
  useEffect(() => {
    async function retrieveCallRecordId(callId: string) {
      setLoadingState(true);
      const response = await props.retrieveVoicemail(callId);

      if (response.status == 200) {
        setRecordUrl(response.voicemailUrl!);

      }
      setLoadingState(false);
    }

    retrieveCallRecordId(props.callId);
  }, []);
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
							text-gray-500 
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
							text-blue-500 border-blue-300 
						"
              >
                Voicemail
              </Link>
            </nav>
          </div>
        </div>{" "}
        <div id="recording">
          {loading && <AudioLoadingSkeletonPulse />}
          {!loading && recordUrl && (
            <div id="transcription" className="mt-6">
              <div className="mt-2 items-center dotted-container text-gray-400">
                {props.planName == "Business" || props.planName == "Growth" ? (
                  <audio
                    controls
                    className="w-full"
                    onError={() => {
                      setRecordUrl("");
                    }}
                  >
                    <source src={recordUrl} type="audio/mp3" /> Your browser
                    does not support the audio element.
                  </audio>
                ) : recordUrl ? (
                  <span>
                    Voicemail is not available on the Basic Plan. Please{" "}
                    <a href="/billing/choose_plan" className="text-blue-500">
                      {" "}
                      upgrade{" "}
                    </a>{" "}
                    to a higher plan to access this feature.
                  </span>
                ) : (
                   null
                )}
              </div>
            </div>
          )}
          {!loading && !recordUrl && <h1>No Audio Records</h1>}
        </div>
      </div>
    </div>
  );
}

export default Recording;
