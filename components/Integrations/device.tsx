import dynamic from "next/dynamic";

import '@/styles/integrations/device.scss'

const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

function Device() {
  return (
    <div className="p-6">
      <div className="bg-white p-6">
        <div className="">
          <div className="mb-6 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
              <h3 className="text-2xl text-gray-900 pb-4">
                Mobile<span className="text-gray-400 ml-2"></span>
              </h3>
            </div>
          </div>
        </div>

        <div className="mb-12 grid max-w-4xl md:grid-cols-6 md:gap-4 md:px-12">
          <div className="text-center">
            <img
              src="/external-logos/mobile.svg"
              className="w-32 mb-4 md:mb-0"
            />
          </div>

          <div className="col-span-5 md:px-4 leading-6">
            <div id="mobile-view" className="w-xl md:ml-12">
              <div>
                <p className="mb-6">
                  To update please specify the device name below.
                </p>{" "}
                <label className="block">
                  <b>Device Name</b>{" "}
                  <input
                    type="text"
                    placeholder="My Phone, Joe's Phone"
                    className="w-full sm:text-sm"
                  />{" "}
                  <span className="text-sm text-gray-500">
                    Help to identify the linked devices.
                  </span>
                </label>{" "}
                <a className="text-blue-500 cursor-pointer md:-mt-4">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#zap"></use>
                  </svg>
                  test
                </a>
              </div>{" "}
              <div id="used-by-pages">
                <div>This integration is not connected to any page.</div>
              </div>{" "}
              <div className="mt-2 text-gray-500 text-sm">
                <SlTooltip
                  content="Jan 24, 2025 @ 11:31pm"
                  placement="bottom"
                  className="text-sm"
                >
                  <div className="cursor-pointer w-fit">
                    Last seen today at 11:31 PM
                  </div>
                </SlTooltip>
              </div>
            </div>
          </div>
        </div>

        <form
          id="integration-toolbar"
          method="post"
          action=""
          className="bg-white grid grid-cols-2 mt-24"
        >
          <div className="text-left">
            <button className="btn btn-red text-lg inline-block">Delete</button>
          </div>{" "}
          <div className="text-right">
            <button className="btn btn-blue text-lg inline-block">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Device
