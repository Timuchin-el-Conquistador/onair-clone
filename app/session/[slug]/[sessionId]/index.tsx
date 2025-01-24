"use client";

import GuestCall from "@/components/session/guest";
import UserCall from "@/components/session/user";
import CallEnded from "@/components/Presentational/call-ended";
import ConnectingCall from "@/components/Presentational/connecting";
import CallDeclined from "@/components/Presentational/call-declined";

import { useState, useEffect } from "react";
import useSession from "@/hooks/useSession";

import { socket } from "@/utils/socket";

import { ExtendedLink } from "@/lib/types/links";
import { Call } from "@/lib/types/call";

type PageProps = {
  url: ExtendedLink;
  isAuth: boolean;
  call: Call;
  slug: string;
  sessionId: string;
};

function ActiveCallSession(props: PageProps) {
  const [status, setStatus] = useState(props.call.callStatus);

  const { session, goOnline, goOffline } = useSession(props.url);

  useEffect(() => {
    if (props.isAuth) return;
    function online() {
      alert("online");
      goOnline();
    }
    function offline() {
      alert("online");
      goOffline();
    }
    function callDeclined() {
      setStatus("declined");
    }
    function callAnswered() {
      setStatus("live");
    }
    function callEnded() {
      setStatus("ended");
    }

    socket.on("call-answered", callAnswered);
    socket.on("call-declined", callDeclined);
    socket.on("call-ended", callEnded);
    socket.on("online", online);
    socket.on("offline", offline);
    return () => {
      socket.off("online", online);
      socket.off("offline", offline);
      socket.off("call-answered", callAnswered);
      socket.off("call-declined", callDeclined);
      socket.off("call-ended", callEnded);
    };
  }, [socket]);

  const endCall = (callId: string, duration: number) => {
    console.log(duration);
    socket.emit("end", { callId, duration });
    setStatus("ended");
  };
console.log(props.isAuth)
  if (status == "declined") {
    return <CallDeclined />;
  }

  if (props.isAuth) {
    if (status == "live") {
      return (
        <UserCall
          slug={session.link.slug}
          sessionId={props.sessionId}
          endCall={endCall}
        />
      );
    } else {
      return (
        <>
        <div id="animated-background" className="">
          <div className="waiting-room-bg"></div>
          <div className="waiting-room-bg waiting-room-bg2"></div>
          <div className="waiting-room-bg waiting-room-bg3"></div>
        </div>
        <CallEnded
          isAuth={true}
          slug={props.slug}
          domain={process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL!}
        />
        </>
      );
    }
  } else {
    if (status == "live") {
      return (
        <GuestCall
          slug={session.link.slug}
          sessionId={props.sessionId}
        />
      );
    } else if (status == "waiting") {
      return (
        <>
          <div id="animated-background" className="">
            <div className="waiting-room-bg"></div>
            <div className="waiting-room-bg waiting-room-bg2"></div>
            <div className="waiting-room-bg waiting-room-bg3"></div>
          </div>
          <ConnectingCall linkName={session.link.linkName} />
        </>
      );
    } else if (status == "ended") {
      return (
        <>
          <div id="animated-background" className="">
            <div className="waiting-room-bg"></div>
            <div className="waiting-room-bg waiting-room-bg2"></div>
            <div className="waiting-room-bg waiting-room-bg3"></div>
          </div>
          <CallEnded
            isAuth={false}
            slug={props.slug}
            domain={process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL!}
          />
        </>
      );
    }
  }
}

export default ActiveCallSession;
