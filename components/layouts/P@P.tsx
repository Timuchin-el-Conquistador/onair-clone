"use client";

import { socket } from "@/utils/socket";

import { Fragment, useEffect, useState } from "react";


import WebCallNotification from "../Notifications/call";

import { type Call } from "@/lib/types/call";

import { useSessionStore } from "@/providers/session";

import { useRouter } from "next/navigation";

function P2PLayout({ children, userId }: { children: React.ReactNode,userId:string }) {
  const router = useRouter();



  const [incommingCalls, setIncommingCalls] = useState<any[]>([]);

  const { pushSession, removeSession } = useSessionStore((state) => state);



  useEffect(() => {
    socket.connect()
    function onConnect() {
      console.log("connected");
 
        socket.emit("web-connect", { userId });

    }
    function call(data: { call: Call }) {
      console.log("incomming session", data);

      setIncommingCalls((calls) => [
        ...calls,
        {
          email: data.call.callerInfo.email,
          fullName: data.call.callerInfo.fullName,
          phone: data.call.callerInfo.phone,
          id: data.call._id,
          slug:data.call.slug
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



  const answerCall = (slug:string,callId: string) => {
    socket.emit("answer", { callId });
    setIncommingCalls((prevState) => prevState.filter((el) => el.id != callId));
    //router.push(`/session/${slug}/${callId}`)
    window.open(`/session/${slug}/${callId}`, '_blank');
  };

  const declineCall = (callId: string) => {
    socket.emit("decline", { callId });
    setIncommingCalls((prevState) => prevState.filter((el) => el.id != callId));
    removeSession(callId);
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
            slug={call.slug}
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
