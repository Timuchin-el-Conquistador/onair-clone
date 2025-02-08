/*import dynamic from "next/dynamic";

const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

function Session() {
  return (
    <div id="session" className="p-6">
      <div className="bg-white p-6">
        <div>
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex overflow-y-scroll remove-scroll">
              <a
                href="/calls/QL4cit39Xq8hWvvS"
                className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-blue-500 border-blue-300 
						"
              >
                Details
              </a>{" "}
              <a
                href="/calls/QL4cit39Xq8hWvvS/transcription"
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
        {true ? (
          <div>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>Name</td> <td>Magush3</td>
                </tr>{" "}
                <tr>
                  <td>E-mail</td> <td>test@gmail.com</td>
                </tr>{" "}
                <tr>
                  <td>Device</td>{" "}
                  <td>
                    Azerbaijan 🇦🇿 <small>(Windows Chrome/131)</small>
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
                    <a href="https://ShopLine.io/napoleon">Teambuilding</a>
                  </td>
                </tr>{" "}
                <tr>
                  <td>Identifier</td> <td>QL4cit39Xq8hWvvS</td>
                </tr>{" "}
                <tr>
                  <td>Answered By</td> <td>Cingiz Hamidov</td>
                </tr>{" "}
                <tr>
                  <td>Date</td> <td>a few seconds ago</td>
                </tr>{" "}
                <tr>
                  <td>Duration</td> <td>1 minute</td>
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
                  content="Jan 18, 2025 @ 09:54am UTC"
                  placement="right-start"
                  className="text-xs"
                >
                  <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                    <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                      Jan 18, 2025 @ 01:54pm
                    </time>{" "}
                    <h3 className="text-gray-900 text-small">Call started</h3>
                  </li>
                </SlTooltip>
                <SlTooltip
                  content="Jan 18, 2025 @ 09:54am UTC"
                  placement="right-start"
                  className="text-xs"
                >
                  <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                    <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                      Jan 18, 2025 @ 01:54pm
                    </time>{" "}
                    <h3 className="text-gray-900 text-small">
                      Answered by Cingiz Hamidov
                    </h3>
                  </li>
                </SlTooltip>
                <SlTooltip
                  content="Jan 18, 2025 @ 09:54am UTC"
                  placement="right-start"
                  className="text-xs"
                >
                  <li className="mb-2.5 ms-4 w-fit cursor-pointer">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>{" "}
                    <time className="inline-block mt-1.5 text-small font-normal leading-none text-gray-400">
                      Jan 18, 2025 @ 01:54pm
                    </time>{" "}
                    <h3 className="text-gray-900 text-small">Call ended</h3>
                  </li>
                </SlTooltip>
              </ol>
            </div>
          </div>
        ) : (
          <div id="recording">
            <audio controls className="w-full">
              <source
                src="https://ShopLine-recordings.s3.amazonaws.com/livekit-cloud/napoleon/QL4cit39Xq8hWvvS/recording.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA6ODU7YWEJXLIJHPA%2F20250118%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20250118T100004Z&amp;X-Amz-Expires=900&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=b5787dc539ca55cb1daef9f260fa28e6d80c5b225de622067cd0597b69658b33"
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
        )}
      </div>
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

export default Session;
*/