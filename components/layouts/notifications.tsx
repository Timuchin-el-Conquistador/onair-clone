"use client";

import dynamic from "next/dynamic";



import {
  IncompletePayment,
  SubscriptionExpired,
  NoActiveSubscription,
} from "../Alerts/billing";
import { NoDevice } from "../Alerts/warning";

import { Plan } from "@/lib/types/billing";

import { socket } from "@/utils/socket";

import { Fragment, useEffect, useState } from "react";

import WebCallNotification from "../Notifications/call";
import { CreateFirstLink, WatchTutorial } from "../modals/tutorial";

import { type Call } from "@/lib/types/call";

import { useSessionStore } from "@/providers/session";

import { useRouter } from "next/navigation";

import useTutorial from "@/hooks/tutorial";
import useLinkForm from "@/hooks/link-form";
import { Settings } from "@/lib/types/links";

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

function Notifications({
  hasActiveDevices,
  subscription,
  userId,
  isNotificationsOn,
  watchedTutorial,
  createUrlAction,
}: {
  isNotificationsOn: boolean;
  hasActiveDevices: boolean;
  subscription: Plan;
  userId: string;
  watchedTutorial: boolean;
  createUrlAction: (
    slug: string,
    linkName: string,
    callStrategy: string | null,
    connectedDevices: string[],
    //integrations: string[],
    availability: string,
    settings: Settings
  ) => Promise<{ status: number; message: string }>;
}) {
  const router = useRouter();

  const [incommingCalls, setIncommingCalls] = useState<any[]>([]);

  const [
    isNoIntegratedDeviceAlertVisible,
    setNoIntegratedDeviceAlertVisibility,
  ] = useState(!hasActiveDevices);

  const { pushNotification, pullSession } = useSessionStore((state) => state);

  //tutorial
  const [error, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccessMesssage] = useState<string>("");
  console.log(watchedTutorial)
  const {
    tutorial,
    toggleFirstModalState,
    toggleSecondModalState,
    finishTutorial,
  } = useTutorial(!watchedTutorial);

  const { form, handleSlugChange } = useLinkForm({
    slug: "",
    availability: "offline",
    linkName: "Call me",
    // integrations: [],
    callStrategy: null,
    connectedDevices: [],
    settings: {
      visitorForm: ["email"],
      onlineMessage: "Introduce yourself and press call.",
      offlineMessage: "We'll get back soon..",
      recording: false,
    },
  });

  const createLink = async () => {
    setLoading(true);
    const response = await createUrlAction(
      form.link.slug,
      form.link.linkName,
      form.link.callStrategy,
      form.link.connectedDevices.map((el) => el._id),
      form.link.availability,
      form.link.settings
    );

    setLoading(false);

    if (response.status === 400) {
      setErrorMessage(response.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

   
    setSuccessMesssage(response.message);
    setTimeout(() => {
      setSuccessMesssage("");
    }, 2000);

    toggleFirstModalState(false); //close

    setTimeout(() => {
      toggleSecondModalState(true);
    }, 500);
  };

  //tutorial

  useEffect(() => {
    socket.connect();
    function onConnect() {
      socket.emit("web-connect", { userId });
    }
    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    if (!isNotificationsOn) return;
    function call(data: { call: Call }) {
      setIncommingCalls((calls) => [
        ...calls,
        {
          email: data.call.callerInfo.email,
          fullName: data.call.callerInfo.fullName,
          phone: data.call.callerInfo.phone,
          id: data.call._id,
          slug: data.call.slug,
        },
      ]);
      pushNotification(data.call, router);
    }
    socket.on("new-session", call);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      if (isNotificationsOn) {
        socket.off("new-session", call);
      }
    };
  }, [socket]);

  const answerCall = (slug: string, callId: string) => {
    socket.emit("answer", { callId });
    setIncommingCalls((prevState) => prevState.filter((el) => el.id != callId));
    //router.push(`/session/${slug}/${callId}`)
    window.open(`/session/${slug}/${callId}`, "_blank");
  };

  const declineCall = (callId: string) => {
    socket.emit("decline", { callId });
    setIncommingCalls((prevState) => prevState.filter((el) => el.id != callId));
    pullSession(callId);
  };

  const closeNoIntegratedDevicesAlert = () => {
    setNoIntegratedDeviceAlertVisibility(false);
  };

  if (isNotificationsOn) {
    return (
      <>
        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: success ? "block" : "hidden",
            zIndex: 100
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
            zIndex: 100
          }}
        >
          <SlAlert variant="danger" open={!!error}>
            <SlIcon slot="icon" name="info-circle"></SlIcon>
            <div className="flex items-center">
              <strong>{error}</strong>
            </div>
          </SlAlert>
        </div>
        {isNoIntegratedDeviceAlertVisible && (
          <NoDevice
            closeNoIntegratedDevicesAlert={closeNoIntegratedDevicesAlert}
          />
        )}
        {subscription?.status == "incomplete_expired" ||
          (subscription.status == "past_due" && <SubscriptionExpired />)}
        {subscription?.status == "incomplete" && <IncompletePayment />}
        {subscription?.status == "canceled" && <NoActiveSubscription />}
        <div className="fixed top-2 right-2 z-[9999] space-y-2">
          {incommingCalls.map((call) => (
            <Fragment key={call.id}>
              <WebCallNotification
                email={call.email}
                fullName={call.fullName}
                phone={call.phone}
                callId={call.id}
                slug={call.slug}
                answer={answerCall}
                decline={declineCall}
              />
            </Fragment>
          ))}
        </div>

        <CreateFirstLink
          modalIsOpen={tutorial.firstModalIsOpen}
          slugStatus={form.slugStatus}
          domain={process.env.NEXT_PUBLIC_FRONTEND_URL!}
          loading={loading}
          handleSlugChange={(value: string) => {
            handleSlugChange(value);
            setTimeout(() => {
              socket.emit("slug-validation", { slug: value });
            }, 1000);
          }}
    
          createFirstLink={() => {
            createLink();
          }}
        />

        <WatchTutorial
          modalIsOpen={tutorial.secondModalIsOpen}
          domain={process.env.NEXT_PUBLIC_FRONTEND_URL!}
          slug={form.link.slug}
          closeModal={() => {
            toggleSecondModalState(false); //close
          }}

        />
      </>
    );
  } else {
    return <></>;
  }
}

export default Notifications;
