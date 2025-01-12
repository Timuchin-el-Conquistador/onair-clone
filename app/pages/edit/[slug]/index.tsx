"use client";

import dynamic from "next/dynamic";

import "@/styles/pages.new.scss";
import ScheduleComponent from "@/components/availability";

import useLinkForm from "@/hooks/useLinkForm";

import { type Link } from "@/lib/types/links";
import Integration from "@/components/integration";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

type PageProps = {
  link: Omit<Link, "timeLength">;
};

function EditLink(props: PageProps) {
  const { form, removeIntegration, handleSlugChange,changeAvailability } = useLinkForm(props.link);

  return (
    <div id="main" className="p-6 mb-20">
      <div className="p-6 bg-white">
        <div className="flex flex-col max-w-3xl w-full">
          <h2 className="font-semibold text-xl mb-12">Edit Link</h2>{" "}
          <div className="md:flex w-full">
            <div className="md:w-1/2">
              <label className="font-medium text-md">Link address</label>{" "}
              <p className="text-xs text-gray-400 mb-2 md:mb-auto">
                You will share this with others.
              </p>
            </div>{" "}
            <div className="md:w-1/2 relative">
              <div className="flex relative">
                <span className="flex items-center px-3 text-sm text-gray-950 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                  onair.io/
                </span>{" "}
                <input
                  name="Slug"
                  placeholder="yourname"
                  className="rounded-none rounded-e-md border border-gray-300 text-gray-700 focus:border-blue-300 focus:outline-none block w-full text-sm py-2 pl-3 pr-10 !truncate"
                  defaultValue={form.link.slug}
                />{" "}
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {form.slugStatus == "pending" ? (
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
                  ) : form.slugStatus == "fulfilled" ||
                    form.slugStatus == null ? (
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
              {form.slugStatus == "taken" && (
                <span className="text-xs text-red-400 absolute -bottom-5">
                  Slug is not available. Please choose another one.
                </span>
              )}
            </div>
          </div>{" "}
          <hr />{" "}
          <div className="md:flex w-full">
            <div className="md:w-1/2">
              <label className="font-medium text-md">Link name</label>{" "}
              <p className="text-xs text-gray-400 mb-2 md:mb-auto">
                Visible to visitors, title of your link page.
              </p>
            </div>{" "}
            <div className="md:w-1/2">
              <input
                name="Name"
                placeholder="Enter unique name for your page"
                className="border border-gray-300 text-gray-700 text-sm rounded-md focus:border-blue-300 focus:outline-none block w-full py-2 px-3 !truncate"
                defaultValue={form.link.linkName}
              />
            </div>
          </div>{" "}
          <hr />{" "}
          <div className="lg:flex w-full">
            <div className="flex flex-col lg:w-1/2">
              <label className="font-medium text-md">Devices</label>{" "}
              <p className="text-xs text-gray-400 mb-2 lg:mb-auto w-[95%]">
                When a visitor calls, devices will be notified based on the
                selected call distribution strategy.
                <SlTooltip
                  content="Different strategies determine how and when your devices are notified of incoming calls. You can set the strategy from options under the '+ Add Device' button and learn more about each option there."
                  style={{ maxWidth: "300px" }}
                >
                  <span className="text-blue-700 cursor-help underline">
                    Learn more
                  </span>
                </SlTooltip>
              </p>
            </div>{" "}
            <div className="lg:w-1/2">
              {form.link.integrations.map((el) => (
                <Integration
                  integration={el}
                  removeIntegration={removeIntegration}
                />
              ))}
              <a className="text-blue-700 text-sm cursor-pointer mt-2 block">
                + Add Device
              </a>{" "}
              <div className="flex items-start mt-7 text-sm">
                <input
                  id="call-all-devices"
                  value="all"
                  name="notify-all"
                  type="radio"
                  className="h-4 w-4 cursor-pointer border-gray-300"
                  defaultChecked={true}
                />{" "}
                <label
                  htmlFor="call-all-devices"
                  className="ml-3 block leading-6 cursor-pointer text-gray-900 -mt-1"
                >
                  Call all devices at once
                </label>
              </div>{" "}
              <div className="flex items-start mt-2 text-sm w-full">
                {/*}    <input
                    id="notifications-strategy"
                    name="notifications-strategy"
                    type="radio"
                    className="h-4 w-4 cursor-pointer border-gray-300"
                  />{" "}
                  <label
                    htmlFor="notifications-strategy"
                    className="ml-3 leading-6 -mt-1 cursor-pointer text-gray-900 w-[90%]"
                  />
                  <span className="mr-1">
                    Call devices using a strategic distribution
                  </span>{" "}*/}
                {/*<sl-tooltip
                    className="flex items-center text-sm inline-flex"
                    style={{ maxWidth: "300px;" }}
                  >
                  <div slot="content">
                    <b>Distribution strategies</b>: determine how devices are
                    notified of incoming calls.
                    <br />
                    <br />
                    1. <b>Round Robin</b>: distributes incoming calls evenly by
                    cycling through devices. For example, if you have 3 devices,
                    Call 1 goes to Device A, Call 2 to Device B, and Call 3 to
                    Device C.
                    <br />
                    <br />
                    2. <b>Prioritized</b>: distributes incoming calls based on
                    the priority you set for each device. For example, if Device
                    A is your top priority, calls will always go to Device A
                    first, then to Device B if A is unavailable.
                    <br />
                    <br /> <b>Notification Delay</b>: introduces a wait time
                    before notifying the same call to another device. This helps
                    ensure that missed calls are retried after a set period.
                  </div>
                  </sl-tooltip>*/}
              </div>
            </div>
          </div>
          <hr />
          <ScheduleComponent availability={form.link.availability} changeAvailability={changeAvailability}/>
          <hr />{" "}
          {/*   <label className="font-medium text-md">Advanced Settings</label>
          <label className="advanced-options-label">
            <SlIcon
              name="dash-square"
              aria-hidden="true"
              library="default"
              className="close-icon mr-2 h-3 hidden"
            ></SlIcon>{" "}
            <SlIcon
              name="plus-square"
              aria-hidden="true"
              library="default"
              className="open-icon mr-2 h-3"
            ></SlIcon>
            Visitor Form
          </label>
          <div className="mt-1 mb-8 expandable-section hidden">
            <SlCheckbox
              size="medium"
              data-optional=""
              data-valid=""
              className="mt-1 ml-6 block"
            >
              Collect email from visitors
            </SlCheckbox>{" "}
            <SlCheckbox
              size="medium"
              form=""
              data-optional=""
              data-valid=""
              className="mt-1 ml-6 block"
            >
              Collect phone from visitors
            </SlCheckbox>{" "}*/}
          {/*<div className="mt-2 ml-6 block text-xs text-gray-400">
              Tip: you can auto-fill using query strings, e.g.
              onair.io/demo?name=John
            </div>*/}
          <div className="w-full flex items-center justify-between mt-16 mb-1">
            <SlButton
              variant="default"
              size="medium"
              data-optional=""
              data-valid=""
              className="inline-block"
            >
              Cancel
            </SlButton>{" "}
            <SlButton
              variant="primary"
              size="medium"
              data-optional=""
              data-valid=""
              className="inline-block"
            >
              Save
            </SlButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLink;
