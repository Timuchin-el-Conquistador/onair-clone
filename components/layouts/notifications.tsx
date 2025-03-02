"use client";

import dynamic from "next/dynamic";

import {
  IncompletePayment,
  SubscriptionExpired,
  NoActiveSubscription,
  TrialPlanWIllSoonEnd,
} from "../Alerts/billing";
import { NoDevice } from "../Alerts/warning";

import { Plan } from "@/lib/types/billing";

import { socket } from "@/utils/socket";

import { Fragment, useCallback, useEffect, useState } from "react";

import WebCallNotification from "../Notifications/call";
import { CreateFirstLink, WatchTutorial } from "../modals/tutorial";

import { type Call } from "@/lib/types/call";

import { useSessionStore } from "@/providers/session";

import { useRouter } from "next/navigation";

import useTutorial from "@/hooks/tutorial";
import useLinkForm from "@/hooks/link-form";
import { Settings } from "@/lib/types/links";
import { updateSession } from "@/lib/session";

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
const isProduction = process.env.NODE_ENV == "production";

function Notifications({
  hasActiveDevices,
  subscription,
  isNotificationsOn,
  watchedTutorial,
  monthlyMinutesCapacityReached,
  prevMonthlyMinutesCapacityReached,
  user,
  createUrlAction,
}: {
  isNotificationsOn: boolean;
  hasActiveDevices: boolean;
  subscription: Plan;
  watchedTutorial: boolean;
  monthlyMinutesCapacityReached: boolean;
  prevMonthlyMinutesCapacityReached: boolean;
  user: string;
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

  // const [incommingCalls, setIncommingCalls] = useState<any[]>([]);

  const [
    isNoIntegratedDeviceAlertVisible,
    setNoIntegratedDeviceAlertVisibility,
  ] = useState(!hasActiveDevices);

  const {
    notifications,
    pushNotification,
    pullNotification,
    joinSession,
    declineSession,
    pushSession,
    endSession,
  } = useSessionStore((state) => state);

  //tutorial
  const [error, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccessMesssage] = useState<string>("");

  const { tutorial, toggleFirstModalState, toggleSecondModalState } =
    useTutorial(!watchedTutorial);

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

  //tutorial
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

  useEffect(() => {
    async function updateCookie() {
      await updateSession(
        "monthlyMinutesCapacityReached",
        monthlyMinutesCapacityReached
      );
    }
    if (prevMonthlyMinutesCapacityReached == monthlyMinutesCapacityReached) {
      return;
    }
    updateCookie();
  }, []);

  useEffect(() => {
    if (!isNotificationsOn) return;
    function call(data: { call: Call }) {
      pushNotification(data.call, router);
      pushSession(data.call, router);
      // pushSession(data.call, router);
    }
    socket.on("new-session", call);

    return () => {
      socket.off("new-session", call);
    };
  }, [socket]);

  //notification
  const answerCall = (slug: string, callId: string) => {
    socket.emit("answer", { callId, user });
    window.open(`/session/${slug}/${callId}`, "_blank");
    pullNotification(callId, router);
    joinSession(user,callId, router);
  };

  const declineCall = (callId: string) => {
    socket.emit("decline", { callId, user });
    pullNotification(callId, router);
    declineSession(user,callId, router);
  };

  const closeNoIntegratedDevicesAlert = useCallback(() => {
    setNoIntegratedDeviceAlertVisibility(false);
  }, [setNoIntegratedDeviceAlertVisibility]);

  useEffect(() => {
    function callEnded(data: { callId: string }) {
      endSession(data.callId, router);
    }
    socket.on("call-ended", callEnded);

    return () => {
      socket.off("call-ended", callEnded);
    };
  }, [socket]);

  if (isNotificationsOn) {
    return (
      <>
        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: success ? "block" : "hidden",
            zIndex: 100,
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
            zIndex: 100,
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
          (subscription?.status == "past_due" && <SubscriptionExpired />)}
        {subscription?.status == "incomplete" && <IncompletePayment />}
        {subscription?.status == "canceled" && <NoActiveSubscription />}
        {subscription?.status == "trial_will_end" && <TrialPlanWIllSoonEnd days={subscription.daysLeftToExpiration} />}
        <div className="fixed top-2 right-2 z-[9999] space-y-2">
          {notifications.map((call) => (
            <Fragment key={call._id}>
              <WebCallNotification
                email={call.callerInfo.email}
                fullName={call.callerInfo.fullName!}
                phone={call.callerInfo.phone}
                callId={call._id}
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
          domain={
            isProduction
              ? process.env.NEXT_PUBLIC_FRONTEND_URL!
              : process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL!
          }
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
          domain={
            isProduction
              ? process.env.NEXT_PUBLIC_FRONTEND_URL!
              : process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL!
          }
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
