"use client";

import dynamic from "next/dynamic";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlDialog = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const SlCopyButton = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/copy-button/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

// Prevent the dialog from closing when the user clicks on the overlay
function handleRequestClose(event: any) {
  if (event.detail.source === "overlay") {
    event.preventDefault();
  }
}

function CreateFirstLink(props: {
  modalIsOpen: boolean;
  slugStatus: string;
  domain: string;
  loading: boolean;
  handleSlugChange: (value: string) => void;
  createFirstLink: () => void;
}) {
  return (
    <SlDialog
      className="dialog-overview with-header text-center font-semibold text-xl mb-12"
      open={props.modalIsOpen}
      //onSlAfterHide={props.closeModal}
      onSlRequestClose={handleRequestClose}
      noHeader
    >
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center py-4">
        <div className="text-xl font-bold">Create your first link</div>{" "}
        <div className="mt-2 text-lg">... and start getting calls</div>{" "}
        <div className="md:flex flex-col w-full mt-8">
          <div className="w-full relative">
            <div className="flex relative">
              <span className="flex items-center px-3 text-sm text-gray-950 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              {props.domain}/
              </span>{" "}
              <input
                name="Slug"
                placeholder="yourname"
                className="rounded-none rounded-e-lg border border-gray-300 text-gray-700 focus:border-blue-300 focus:outline-none block w-full text-sm py-2 pl-3 pr-10 !truncate"
                onChange={(event) => {
                  const value = event.target.value.trim();
                  props.handleSlugChange(value);
                }}
              />{" "}
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {props.slugStatus == "checking" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                ) : props.slugStatus == "active" || props.slugStatus == null ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-red-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
              </span>
            </div>
          </div>{" "}
          <div className="text-left mt-1">
            <div
              className={`text-xs ${
                props.slugStatus == "taken" ? "text-red-400" : "text-gray-500"
              }`}
            >
              {props.slugStatus == "taken"
                ? "Slug is not available. Please choose another one."
                : "You can always change this later"}
            </div>
          </div>
        </div>{" "}
        <div className="mt-8">
          <SlButton
            variant="primary"
            size="medium"
            data-optional=""
            data-valid=""
            onClick={props.createFirstLink}
            className="min-w-24"
          >
            {props.loading ? (
              <SlSpinner
                style={
                  {
                    fontSize: "1rem",
                    "--indicator-color": "white",
                  } as React.CSSProperties
                }
              />
            ) : (
              "Get Started"
            )}
          </SlButton>
        </div>
      </div>
    </SlDialog>
  );
}

function WatchTutorial(props: {
  modalIsOpen: boolean;
  slug: string;
  domain: string;
  closeModal: () => void;

}) {
  return (
    <SlDialog
      className="dialog-overview with-header text-center font-semibold text-xl mb-12"
      open={props.modalIsOpen}
      //onSlAfterHide={() => props.closeModal(true)} //kepp it open
      onSlRequestClose={handleRequestClose}
      noHeader
    >
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto text-center pb-4">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#2ECC70"
            className="w-16 h-16 sm:h-24 sm:w-24"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>{" "}
        <div className="mt-4 text-lg sm:text-xl font-bold">
          Done! Share link and get calls
        </div>{" "}
        <div className="mt-4 text-xs sm:text-sm text-left">
          Copy the link below and share it (via text, email, LinkedIn, anywhere
          really). Anyone can call you without downloading an app, and it will
          ring on your phone.
          <div className="relative mt-2">
            <input
              readOnly
              className="rounded-md relative font-mono bg-gray-200 text-gray-700 focus:outline-none block w-full text-xs py-2 pl-3 pr-10 !truncate"
              value={props.domain + "/" + props.slug}
            />{" "}
            <SlCopyButton
              value={props.domain + "/" + props.slug}
              className="absolute top-[0.12rem] right-[0.12rem]"
            ></SlCopyButton>{" "}
            <div className="text-xs text-gray-500">
              Customize your availability, offline message, and other settings{" "}
              <a href={process.env.NEXT_PUBLIC_FRONTEND_URL}>here</a>
            </div>
          </div>
        </div>{" "}
        <div className="w-full mt-4 rounded overflow-hidden">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
          {/*props.modalIsOpen && <iframe
              src="https://customer-dy1mf0ws9vunh0eq.cloudflarestream.com/eb9c4b48d2c728f157fb0ae17912796a/iframe?poster=https%3A%2F%2Fcustomer-dy1mf0ws9vunh0eq.cloudflarestream.com%2Feb9c4b48d2c728f157fb0ae17912796a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              style={{
                border: "none",
                position: "absolute",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
              }}
            ></iframe>*/}
          </div>
        </div>{" "}
        <div className="mt-12">
          <SlButton
            variant="primary"
            size="medium"
            data-optional=""
            data-valid=""

            onClick={props.closeModal}
          >
            Close
          </SlButton>
        </div>
      </div>
    </SlDialog>
  );
}

export { CreateFirstLink, WatchTutorial };
