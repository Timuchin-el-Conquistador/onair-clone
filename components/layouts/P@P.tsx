"use client";

import { socket } from "@/utils/socket";

import { Fragment, useEffect, useRef, useState } from "react";

import { useUserStore } from "@/providers/user";

import { DataConnection, Peer } from "peerjs";
import WebCallNotification from "../Notifications/call";

import { type Session } from "@/lib/types/call";

import { useSessionStore } from "@/providers/session";

import { useRouter } from "next/navigation";

function P2PLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { getUser, user, loading } = useUserStore((state) => state);

  const [incommingCalls, setIncommingCalls] = useState<any[]>([]);

  const { pushSession, removeSession } = useSessionStore((state) => state);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function call(data: { call: Session }) {
      console.log("incomming session", data);

      setIncommingCalls((calls) => [
        ...calls,
        {
          email: data.call.callerInfo.email,
          fullName: data.call.callerInfo.fullName,
          phone: data.call.callerInfo.phone,
          id: data.call._id,
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

  useEffect(() => {
    if (user == null) return;
    socket.emit("web-connect", { userId: user._id });
  }, [user]);

  const answerCall = (callId: string) => {
    socket.emit("answer", { callId });
  };

  const declineCall = (callId: string) => {
    socket.emit("decline", { callId });
    setIncommingCalls((prevState) => prevState.filter((el) => el.id != callId));
    removeSession(callId)
  };
  return (
    <>
      {incommingCalls.map((call) => (
        <Fragment key={call.email}>
          <WebCallNotification
            email={call.email}
            fullName={call.fullName}
            phone={call.phone}
            callId={call.id}
            answer={answerCall}
            decline={declineCall}
          />
        </Fragment>
      ))}

      {children}
    </>
  );
}

export default P2PLayout;
