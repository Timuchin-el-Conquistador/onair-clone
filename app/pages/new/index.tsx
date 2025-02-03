"use client";

import dynamic from "next/dynamic";

import DailyAvailability from "@/components/availability";
import ConnectedDevice from "@/components/Integrations/connected-device";
import NoConnectedDeviceWarning from "@/components/modals/no-connected-device-warning";
import AvailableDevices from "@/components/modals/available-devices";

import Spinner from "@/components/Loaders/spinner";

import useLinkForm from "@/hooks/useLinkForm";

import "@/styles/pages.new.scss";

import { type Settings } from "@/lib/types/links";
import { type Device } from "@/lib/types/device";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { socket } from "@/utils/socket";

import Link from "next/link";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlCheckbox = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/checkbox/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlDialog = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    // loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlIcon = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //   loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    //  loading: () => <>Loading...</>,
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
type PageProps = {
  //integrations: IIntegration[];
  devices: Device[];
  hasDevices: boolean;
  createUrlAction: (
    slug: string,
    linkName: string,
    callStrategy: string | null,
    connectedDevices: string[],
    //integrations: string[],
    availability: string,
    settings: Settings
  ) => Promise<{ status: number; message: string }>;
};
function NewLink(props: PageProps) {
  const router = useRouter();
  const {
    form,
    handleSlugChange,
    handleLinkNameChange,
    unlinkDeviceFromUrl,
    changeAvailability,
    visitorFormFieldsChange,
    connectDevices,
    changeOnlineMessage,
    changeOfflineMessage,
  } = useLinkForm({
    slug: "",
    availability: "online",
    linkName: "",
    integrations: [],
    callStrategy: null,
    connectedDevices: [],
    settings: {
      visitorForm: ["email"],
      onlineMessage: "Introduce yourself and press call.",
      offlineMessage: "We'll get back soon..",
      recording: false,
    },
  });

  const [error, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccessMesssage] = useState<string>("");
  const [
    isNoConnectedMobileDeviceModalVisible,
    setNoConnectedMobileDeviceModalVisibility,
  ] = useState(false);

  const [isAvailableDevicesModalOpen, setAvailableDevicesModalState] =
    useState(false);

  const [settingsVisibility, setSettingsVisibility] = useState({
    visitorForm: false,
    customMessages: false,
  });

  const checkedDevices: Device[] = [];

  const linkDevices = () => {
    connectDevices(checkedDevices);
    setAvailableDevicesModalState(false);
  };

  const createLink = async () => {
    //setLoading(true);
    const response = await props.createUrlAction(
      form.link.slug,
      form.link.linkName,
      form.link.callStrategy,
      form.link.connectedDevices.map((el) => el._id),
      form.link.availability,
      form.link.settings
    );

  //  setLoading(false);
    if (response.status === 400) {
      setErrorMessage(response.message);

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    router.replace("/dashboard");
  };
  return (
    <>
      <div id="main" className="p-6 mb-20">
        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: loading ? "block" : "hidden",
          }}
        >
          <SlAlert variant="primary" open={loading}>
            <SlIcon slot="icon" name="info-circle"></SlIcon>
            <div className="flex items-center">
              <strong>Canceling subscription</strong>

              <SlSpinner
                style={{ fontSize: "1rem", marginLeft: "1rem" }}
              ></SlSpinner>
            </div>
          </SlAlert>
        </div>

        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: success ? "block" : "hidden",
          }}
        >
          <SlAlert variant="success" open={!!success}>
            <SlIcon slot="icon" name="info-circle"></SlIcon>
            <div className="flex items-center">
              <strong>{success}</strong>
            </div>
          </SlAlert>
        </div>

        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: error ? "block" : "hidden",
          }}
        >
          <SlAlert variant="danger" open={!!error}>
            <SlIcon slot="icon" name="info-circle"></SlIcon>
            <div className="flex items-center">
              <strong>{error}</strong>
            </div>
          </SlAlert>
        </div>
        <div className="p-6 bg-white">
          <div className="flex flex-col max-w-3xl w-full">
            <h2 className="font-semibold text-xl mb-12">Create Link</h2>{" "}
            <div className="md:flex w-full">
              <div className="md:w-1/2">
                <label className="font-medium text-md">Link address</label>{" "}
                <p className="text-xs text-gray-400 mb-2 md:mb-auto">
                  You will share this with others.
                </p>
              </div>{" "}
              <div className="md:w-1/2 relative">
                <div className="flex relative">
                  <span className="flex items-center px-3 text-sm text-gray-950 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md max-w-48">
                    domain/
                  </span>{" "}
                  <input
                    name="Slug"
                    placeholder="link name"
                    className="rounded-none rounded-e-md border border-gray-300 text-gray-700 focus:border-blue-300 focus:outline-none block w-full text-sm py-2 pl-3 pr-10 !truncate"
                    // value={form.link.slug}
                    onChange={(event) => {
                      const value = event.target.value.trim();
                      handleSlugChange(value, false);
                      setTimeout(() => {
                        socket.emit("slug-validation", { slug: value });
                      }, 1000);
                    }}
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
                  onChange={(event) => {
                    const value = event.target.value.trim();
                    handleLinkNameChange(value);
                  }}
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
                {form.link.connectedDevices.map((el) => (
                  <Fragment key={el._id}>
                    <ConnectedDevice
                      device={el}
                      removeDeviceFromLink={unlinkDeviceFromUrl}
                    />
                  </Fragment>
                ))}
                {!props.hasDevices ? (
                  <div className="lg:w-full">
                    {" "}
                    <div
                      role="alert"
                      className="mt-2 md:mt-auto bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 rounded-lg"
                    >
                      <p className="font-medium">Connect your phone</p>{" "}
                      <p className="text-xs mt-1">
                        You did not connect a phone to receive calls when
                        someone uses this link.
                      </p>{" "}
                      <Link
                        href="/integrations/new/mobile"
                        className="mt-2 inline-block text-xs font-semibold text-yellow-800 hover:text-yellow-600 hover:underline"
                      >
                        + Add Device
                      </Link>
                    </div>{" "}
                  </div>
                ) : (
                  <SlButton
                    className="text-blue-700 text-sm cursor-pointer mt-2 block"
                    onClick={() => {
                      setAvailableDevicesModalState(true);
                    }}
                  >
                    + Add Device
                  </SlButton>
                )}
                {form.link.connectedDevices.length > 0 && (
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
                  </div>
                )}
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
            <DailyAvailability
              availability={form.link.availability}
              changeAvailability={changeAvailability}
            />
            <hr />{" "}
            <label className="font-medium text-md">Advanced Settings</label>
            <label
              className="advanced-options-label"
              onClick={() => {
                setSettingsVisibility((state) => ({
                  ...state,
                  visitorForm: !state.visitorForm,
                }));
              }}
            >
              <SlIcon
                name="dash-square"
                aria-hidden="true"
                library="default"
                className={`close-icon mr-2 h-3 ${
                  !settingsVisibility.visitorForm && "hidden"
                }`}
              ></SlIcon>
              <SlIcon
                name="plus-square"
                aria-hidden="true"
                library="default"
                className={`close-icon mr-2 h-3 ${
                  settingsVisibility.visitorForm && "hidden"
                }`}
              ></SlIcon>
              Visitor Form
            </label>
            <div
              className={`mt-1 mb-8 expandable-section ${
                !settingsVisibility.visitorForm && "hidden"
              }`}
            >
              <SlCheckbox
                size="medium"
                data-optional=""
                data-valid=""
                className="mt-1 ml-6 block"
                checked={form.link.settings.visitorForm.includes("email")}
                onSlChange={(event) => {
                  const checked = (event.target as HTMLInputElement).checked;

                  visitorFormFieldsChange({ checked, field: "email" });
                }}
              >
                Collect email from visitors
              </SlCheckbox>{" "}
              <SlCheckbox
                size="medium"
                form=""
                data-optional=""
                data-valid=""
                className="mt-1 ml-6 block"
                checked={form.link.settings.visitorForm.includes("phone")}
                onSlChange={(event) => {
                  const checked = (event.target as HTMLInputElement).checked;

                  visitorFormFieldsChange({ checked, field: "phone" });
                }}
              >
                Collect phone from visitors
              </SlCheckbox>{" "}
              <div className="mt-2 ml-6 block text-xs text-gray-400">
                Tip: you can auto-fill using query strings, e.g.
                {process.env.NEXT_PUBLIC_FRONTEND_URL}/demo?name=John
              </div>
            </div>
            <label
              className="advanced-options-label"
              onClick={() => {
                setSettingsVisibility((state) => ({
                  ...state,
                  customMessages: !state.customMessages,
                }));
              }}
            >
              <SlIcon
                name="dash-square"
                aria-hidden="true"
                library="default"
                className={`close-icon mr-2 h-3 ${
                  !settingsVisibility.customMessages && "hidden"
                }`}
              ></SlIcon>
              <SlIcon
                name="plus-square"
                aria-hidden="true"
                library="default"
                className={`close-icon mr-2 h-3 ${
                  settingsVisibility.customMessages && "hidden"
                }`}
              ></SlIcon>
              Custom Messages
            </label>
            <div
              className={`mt-1 mb-8 expandable-section ${
                !settingsVisibility.customMessages && "hidden"
              }`}
            >
              <div className="md:flex mt-1 w-full">
                <div className="md:w-1/2">
                  <label>Online message</label>{" "}
                  <p className="text-xs text-gray-400 mb-2 md:mb-auto">
                    Shown to visitors when you're online
                  </p>
                </div>{" "}
                <div className="md:w-1/2">
                  <textarea
                    name="online-message"
                    placeholder="Maximum 180 characters"
                    rows={3}
                    className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:border-blue-300 focus:shadow-none focus:ring-0 focus:outline-none block w-full py-2 px-3"
                    defaultValue={form.link.settings.onlineMessage}
                    onChange={(event) => {
                      const value = (event.target as HTMLTextAreaElement).value;
                      changeOnlineMessage(value);
                    }}
                  ></textarea>{" "}
                  <span className="text-xs text-gray-400">34/180</span>
                </div>
              </div>{" "}
              <div className="md:flex w-full mt-4">
                <div className="md:w-1/2">
                  <label>Offline message</label>{" "}
                  <p className="text-xs text-gray-400 mb-2 md:mb-auto">
                    Shown to visitors when you're offline
                  </p>
                </div>{" "}
                <div className="md:w-1/2">
                  <textarea
                    name="offline-message"
                    placeholder="Maximum 180 characters"
                    rows={3}
                    className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:border-blue-300 focus:shadow-none focus:ring-0 focus:outline-none block w-full py-2 px-3"
                    defaultValue={form.link.settings.offlineMessage}
                    onChange={(event) => {
                      const value = (event.target as HTMLTextAreaElement).value;
                      changeOfflineMessage(value);
                    }}
                  ></textarea>{" "}
                  <span className="text-xs text-gray-400">21/180</span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-16 mb-1">
              <SlButton
                variant="default"
                size="medium"
                data-optional=""
                data-valid=""
                className="inline-block"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </SlButton>{" "}
              <SlButton
                variant="primary"
                size="medium"
                data-optional=""
                data-valid=""
                className="inline-block"
                onClick={async () => {
                  if (!form.link.connectedDevices.length) {
                    setNoConnectedMobileDeviceModalVisibility(true);
                  } else {
                    createLink();
                  }
                }}
              >
                Save
              </SlButton>
            </div>
          </div>
        </div>
      </div>

      {loading ? <Spinner /> : null}

      <NoConnectedDeviceWarning
        isNoConnectedMobileDeviceModalVisible={
          isNoConnectedMobileDeviceModalVisible
        }
        proceedWithoutConnectingDevice={() => {
          setNoConnectedMobileDeviceModalVisibility(false);
          createLink();
        }}
        continueEditingLink={() => {
          setNoConnectedMobileDeviceModalVisibility(false);
        }}
      />

      <AvailableDevices
        isAvailableDevicesModalOpen={isAvailableDevicesModalOpen}
        setAvailableDevicesModalState={setAvailableDevicesModalState}
        unlinkDeviceFromUrl={unlinkDeviceFromUrl}
        linkDevices={linkDevices}
        checkedDevices={checkedDevices}
        availableDevices={props.devices}
        connectedDevices={form.link.connectedDevices}
      />
    </>
  );
}

export default NewLink;
