"use client";

import "@/styles/calls/waiting-room.scss";

import VisitorForm from "@/components/Form/visitor";
import ConnectingCall from "@/components/Presentational/connecting";
import UrlIsOffline from "./Presentational/offline";

import { socket } from "@/utils/socket";

import { useEffect, useState } from "react";

import { ExtendedLink, Settings } from "@/lib/types/links";

import useSession from "@/hooks/useSession";

type PageProps = {
  slug: string;
  url: ExtendedLink;
};
function Visitor(props: PageProps) {

  const [isConnecting, setIsCOnnecting] = useState(false);
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
    setIsCOnnecting(true);
  };

  useEffect(() => {
    function online() {
      goOnline();
    }
    function offline() {
      goOffline();
    }
    socket.emit("session", {
      slug: props.slug,
    });
    socket.on("online", online);
    socket.on("offline", offline);

    return () => {
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
      {isConnecting && <ConnectingCall />}{" "}
      {!isConnecting && session.link.availability == "online" && (
        <VisitorForm
          call={call}
          slug={props.slug}
          linkName={session.link.linkName}
          message={session.link.settings.onlineMessage}
        />
      )}
      {!isConnecting && session.link.availability == "offline" && (
        <UrlIsOffline
          linkName={session.link.linkName}
          message={session.link.settings.offlineMessage}
        />
      )}
    </>
  );
}

export default Visitor;
