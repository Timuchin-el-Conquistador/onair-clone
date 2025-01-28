"use client";

import "@/styles/calls/waiting-room.scss";

import VisitorForm from "@/components/Form/visitor";
import ConnectingCall from "@/components/Presentational/connecting";
import UrlIsOffline from "./Presentational/offline";

import { socket } from "@/utils/socket";

import { useEffect, useRef } from "react";

import { ExtendedLink, Settings } from "@/lib/types/links";

import useSession from "@/hooks/useSession";

import { useRouter } from "next/navigation";

type PageProps = {
  slug: string;
  url: ExtendedLink;
};
function Visitor(props: PageProps) {
  const router = useRouter();

  const { session, goOnline, goOffline } = useSession({
    ...props.url,
  });

  const infoRef = useRef({
    browser: "Unknown",
    operatingSystem: "Unknown",
    device: "Unknown",
  });

  useEffect(() => {
    /*async function fetchLocation() {
      try {
        const response = await axios.get("/api/ip");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    fetchLocation()*/

    const userAgent = window.navigator.userAgent.toLowerCase();

    // Detect Browser
    switch (true) {
      case userAgent.includes("chrome") &&
        !userAgent.includes("edge") &&
        !userAgent.includes("opr"):
        infoRef.current.browser = "Google Chrome";
        break;

      case userAgent.includes("safari") && !userAgent.includes("chrome"):
        infoRef.current.browser = "Safari";
        break;

      case userAgent.includes("firefox"):
        infoRef.current.browser = "Mozilla Firefox";
        break;

      case userAgent.includes("opr") || userAgent.includes("opera"):
        infoRef.current.browser = "Opera";
        break;

      case userAgent.includes("edge"):
        infoRef.current.browser = "Microsoft Edge";
        break;

      case userAgent.includes("trident") || userAgent.includes("msie"):
        infoRef.current.browser = "Internet Explorer";
        break;

      default:
        infoRef.current.browser = "Unknown Browser";
        break;
    }

    // Detect Operating System
    switch (true) {
      case userAgent.includes("windows nt 10"):
        infoRef.current.operatingSystem = "Windows 10";
        break;

      case userAgent.includes("windows nt 6.3"):
        infoRef.current.operatingSystem = "Windows 8.1";
        break;

      case userAgent.includes("windows nt 6.2"):
        infoRef.current.operatingSystem = "Windows 8";
        break;

      case userAgent.includes("windows nt 6.1"):
        infoRef.current.operatingSystem = "Windows 7";
        break;

      case userAgent.includes("mac os"):
        infoRef.current.operatingSystem = "MacOS";
        break;

      case userAgent.includes("linux"):
        infoRef.current.operatingSystem = "Linux";
        break;

      case userAgent.includes("android"):
        infoRef.current.operatingSystem = "Android";
        break;

      case userAgent.includes("iphone") || userAgent.includes("ipad"):
        infoRef.current.operatingSystem = "iOS";
        break;

      default:
        infoRef.current.operatingSystem = "Unknown OS";
        break;
    }

    // Detect Device Type
    switch (true) {
      case userAgent.includes("mobile"):
        infoRef.current.device = "Mobile";
        break;

      case userAgent.includes("tablet"):
        infoRef.current.device = "Tablet";
        break;

      default:
        infoRef.current.device = "Desktop";
        break;
    }
  }, []);

  const call = (
    fullName: string,
    email: string | null,
    phone: string | null,
    slug: string
  ) => {
    socket.emit("call", {
      callerInfo: { fullName, email, phone, info: infoRef.current },
      slug,
    });
  };

  useEffect(() => {
    function callSessionCreated({ callId }: { callId: string }) {
      router.push(`/session/${props.slug}/${callId}`);
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

      {session.link.availability == "online" && (
        <VisitorForm
          call={call}
          slug={props.slug}
          linkName={session.link.linkName}
          message={session.link.settings.onlineMessage}
          isEmailRequired={props.url.settings.visitorForm.includes("email")}
          isPhoneRequired={props.url.settings.visitorForm.includes("phone")}
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
