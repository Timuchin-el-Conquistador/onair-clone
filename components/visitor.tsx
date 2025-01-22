"use client";

import "@/styles/calls/waiting-room.scss";

import VisitorForm from "@/components/Form/visitor";
import ConnectingCall from "@/components/Presentational/connecting";
import UrlIsOffline from "./Presentational/offline";

import { socket } from "@/utils/socket";

import { useEffect, useState } from "react";

import { ExtendedLink, Settings } from "@/lib/types/links";

import useSession from "@/hooks/useSession";

import { useRouter } from "next/navigation";


type PageProps = {
  slug: string;
  url: ExtendedLink;
};
function Visitor(props: PageProps) {
  const router = useRouter()


  const { session, goOnline, goOffline } = useSession({
    ...props.url,
  });

  const call = (
    fullName: string,
    email: string,
    phone: string,
    slug: string
  ) => {
    socket.emit("call", {
      callerInfo: { fullName, email, phone },
      slug,
    });

  };

  useEffect(() => {
    function callSessionCreated({callId}:{callId:string}) {
      router.push(`/session/${props.slug}/${callId}`)
    }
    function online() {
      goOnline();
    }
    function offline() {
      goOffline();
    }

    socket.on("session", callSessionCreated);
    socket.on("online", online);
    socket.on("offline", offline);

  
    return () => {
      socket.off("session", callSessionCreated);
      socket.off("online", online);
      socket.off("offline", offline);
    };
  }, [socket, props.slug]);

  return (
    <>
      <div id="animated-background" className="">
        <div className="waiting-room-bg"></div>
        <div className="waiting-room-bg waiting-room-bg2"></div>
        <div className="waiting-room-bg waiting-room-bg3"></div>
      </div>
 
      { session.link.availability == "online" && (
        <VisitorForm
          call={call}
          slug={props.slug}
          linkName={session.link.linkName}
          message={session.link.settings.onlineMessage}
          isEmailRequired={props.url.settings.visitorForm.includes('email')}
          isPhoneRequired={props.url.settings.visitorForm.includes('phone')}
        />
      )}
      {session.link.availability == "offline" && (
        <UrlIsOffline
          linkName={session.link.linkName}
          message={session.link.settings.offlineMessage}
        />
      )}
    </>
  );
}

export default Visitor;
