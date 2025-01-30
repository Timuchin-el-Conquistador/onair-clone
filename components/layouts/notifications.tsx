"use client";

import "@/styles/layouts.scss";

import Sidebar from "../sidebar";

import { SubscriptionExpired } from "../Alerts/billing";
import { Plan } from "@/lib/types/billing";
import { NoDevice } from "../Alerts/warning";

import { socket } from "@/utils/socket";

import { Fragment, useEffect, useState } from "react";

import WebCallNotification from "../Notifications/call";

import { type Call } from "@/lib/types/call";

import { useSessionStore } from "@/providers/session";
import { useUserStore } from "@/providers/user";

import { useRouter } from "next/navigation";

function Notifications({
  children,
  page,
  hasActiveDevices,
  subscription,
  userId,
}: {
  children: React.ReactNode;
  page: string;
  hasActiveDevices: boolean;
  subscription: Plan;
  userId: string;
}) {
  const router = useRouter();

  const [incommingCalls, setIncommingCalls] = useState<any[]>([]);

  const { pushSession, removeSession } = useSessionStore((state) => state);

  const { setCurrentSubscription } = useUserStore((state) => state);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      socket.emit("web-connect", { userId });
    }
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
    function onDisconnect() {}

    socket.on("connect", onConnect);

    socket.on("new-session", call);

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("new-session", call);
      socket.off("disconnect", onDisconnect);
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

  useEffect(() => {
    setCurrentSubscription(subscription)
  }, []);

  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      <Sidebar page={page} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {!hasActiveDevices && <NoDevice />}
          {!subscription?.active && <SubscriptionExpired />}

          {incommingCalls.map((call) => (
            <Fragment key={call.email}>
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
          {children}
        </main>
      </div>
    </div>
  );
}

export default Notifications;
