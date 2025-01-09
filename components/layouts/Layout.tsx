'use client'

import Link from "next/link";

import "@/styles/layouts.scss";
import Sidebar from "../sidebar";

import Warning from "../Alerts/warning";

  import { socket } from "@/socket";

import { useEffect,useState } from "react";
 

function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {


  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);

  useEffect(() => {

 
    function onConnect() {
      console.log("connected");

      socket.emit("register");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);
  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      <Sidebar page={page} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Warning>
            <div className="sm:flex  items-center">
              <div>
                <strong className="text-sm sm:text-base font-bold">Reduce missed calls</strong>
                <p className="text-sm mb-1">
                  Download OnAir mobile app to receive calls and stay connected
                  wherever you are.
                </p>
              </div>
              <br />
              <div className="md:ml-auto flex items-center justify-evenly mt-3 sm:mt-0">
                <a
                  href="/ios"
                  target="_blank"
                  className="sm:mr-2 flex justify-center items-center bg-black hover:bg-gray-800 text-white w-36 h-12 rounded-md transition-colors duration-300"
                >
                  <img
                    src="/external-logos/apple-white-logo.svg"
                    alt="Apple"
                    className="w-8 h-8 mr-2"
                  />{" "}
                  <div>
                    <span className="block text-[10px]">Download from</span>{" "}
                    <span className="block text-[13px] font-medium">
                      Apple Store
                    </span>
                  </div>
                </a>{" "}
                <a
                  href="/android"
                  target="_blank"
                  className="flex justify-center items-center bg-black hover:bg-gray-800 text-white w-36 h-12 rounded-md transition-colors duration-300"
                >
                  <img
                    src="/external-logos/google-play-store.svg"
                    alt="Google"
                    className="w-8 h-8 mr-2"
                  />{" "}
                  <div>
                    <span className="block text-[10px]">Download from</span>{" "}
                    <span className="block text-[13px] font-medium">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </Warning>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
