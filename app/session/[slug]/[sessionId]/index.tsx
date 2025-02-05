"use client";

import GuestCall from "@/components/session/guest";
import UserCall from "@/components/session/user";
import CallEnded from "@/components/Presentational/call-ended";
import ConnectingCall from "@/components/Presentational/connecting";
import CallDeclined from "@/components/Presentational/call-declined";
import PrivateLayout from "@/components/layouts/private";

import { useState, useEffect } from "react";
import useSession from "@/hooks/session";

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
    //if (props.isAuth) return;

    function online() {
      goOnline();
    }
    function offline() {
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
    socket.emit("end", { callId, duration });
    setStatus("ended");
  };

  if (status == "declined") {
    return <CallDeclined />;
  }

  if (props.isAuth) {
    if (status == "live") {
      return (
        <PrivateLayout page="" sidebar={false} notifications={false}>
          <UserCall
            slug={session.link.slug}
            sessionId={props.sessionId}
            callerInfo={props.call.callerInfo}
            endCall={endCall}
          />
          </PrivateLayout>

      );
    } else {
      return (
        <>
          <div id="animated-background" className="">
            <div className="waiting-room-bg"></div>
            <div className="waiting-room-bg waiting-room-bg2"></div>
            <div className="waiting-room-bg waiting-room-bg3"></div>
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <CallEnded
              isAuth={true}
              slug={props.slug}
              domain={process.env.NEXT_PUBLIC_FRONTEND_URL!}
            />
          </div>
        </>
      );
    }
  } else {
    if (status == "live") {
      return (
        
        <GuestCall
          slug={session.link.slug}
          sessionId={props.sessionId}
          endCall={endCall}
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
          <div className="flex justify-center items-center w-full h-full">
            <ConnectingCall linkName={session.link.linkName} />
          </div>
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
          <div className="flex justify-center items-center w-full h-full">
            <CallEnded
              isAuth={false}
              slug={props.slug}
              domain={process.env.NEXT_PUBLIC_FRONTEND_URL!}
            />
          </div>
        </>
      );
    }
  }
}

export default ActiveCallSession;
