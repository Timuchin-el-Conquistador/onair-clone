"use client";

import dynamic from "next/dynamic";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlDialog = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //loading: () => <>Loading...</>,
    ssr: false,
  }
);

function CallEnded(props: { isAuth: boolean; slug: string; domain: string }) {
  console.log("CALL IS ENDED");
  return (
    <div
      id="visitor-dialog"
      className="modal-dialog no-transition visible"
      style={{ marginLeft: "-230.812px", marginTop: "-111.75px" }}
    >
      <div id="conference-container">
        <div className="text-center" style={{ display: "none" }}>
          You have left the channel.{" "}
          <span className="text-blue-500 cursor-pointer">Refresh</span> to
          rejoin.
        </div>{" "}
        <div className="p-6">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700">Call ended</h2>
          </div>{" "}
          <p className="text-gray-700 mt-2">
            This call is no longer active.{" "}
            {!props.isAuth && (
              <span>
                You can start a new one from the{" "}
                <a
                  href={`${props.domain}/${props.slug}`}
                  className="text-blue-500"
                >
                  call link
                </a>
                .
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CallEnded;
