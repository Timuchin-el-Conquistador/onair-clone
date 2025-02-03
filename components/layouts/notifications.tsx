"use client";

import "@/styles/layouts.scss";

import { IncompletePayment, SubscriptionExpired,NoActiveSubscription } from "../Alerts/billing";
import { Plan } from "@/lib/types/billing";
import { NoDevice } from "../Alerts/warning";

import { socket } from "@/utils/socket";

import { Fragment, useEffect, useState } from "react";

import WebCallNotification from "../Notifications/call";

import { type Call } from "@/lib/types/call";

import { useSessionStore } from "@/providers/session";

import { useRouter } from "next/navigation";



function Notifications({
  hasActiveDevices,
  subscription,
  id,
  isNotificationsOn,
}: {
  isNotificationsOn: boolean;
  hasActiveDevices: boolean;
  subscription: Plan;
  id: string;
}) {
  const router = useRouter();

  const [incommingCalls, setIncommingCalls] = useState<any[]>([]);

  const { pushSession, removeSession } = useSessionStore((state) => state);

 // const { setCurrentSubscription } = useUserStore((state) => state);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      socket.emit("web-connect", { id });
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
      pushSession(data.call, router);
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
    removeSession(callId);
  };

  

  if (isNotificationsOn) {
    return (
      <>
        {!hasActiveDevices && <NoDevice />}
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
      </>
    );
  } else {
    return <></>;
  }
}

export default Notifications;
