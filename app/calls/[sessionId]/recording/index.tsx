"use client";

import Link from "next/link";

import "@/styles/calls/index.scss";
import "@/styles/calls/recording.scss";

type PageProps = {
  linkName: string;
  callId: string;
  callStartedTime: string;
  callAnsweredTime: string;
  callEndedTime: string;
  duration: number;
  callStatus: string;
  ownerFullName: string;
};

function Recording(props: PageProps) {
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
							text-blue-500 border-blue-300 
						"
              >
                Recording
              </Link>
            </nav>
          </div>
        </div>{" "}
        <div id="recording">
          <audio controls className="w-full">
            <source
              src="https://onair-recordings.s3.amazonaws.com/livekit-cloud/timuchin3/w0hxQFcBVEoOTLNk/recording.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA6ODU7YWEJXLIJHPA%2F20250206%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20250206T190444Z&amp;X-Amz-Expires=900&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=996e203d7e3832893fb7b1e6649a0798bd4ce48000ee94c847e84647b6182745"
              type="audio/mp4"
            />{" "}
            Your browser does not support the audio element.
          </audio>{" "}
          <div id="transcription" className="mt-6">
            <div className="mt-2 items-center dotted-container text-gray-400">
              <span>
                Transcription is not available on the Basic Plan. Please{" "}
                <a href="/billing/choose_plan" className="text-blue-500">
                  {" "}
                  upgrade{" "}
                </a>{" "}
                to a higher plan to access this feature.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recording;
