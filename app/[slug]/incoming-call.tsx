"use client";

import { useState, useEffect } from "react";

import { socket } from "@/socket";

import { Peer } from "peerjs";




function IncommingCalls() {

  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [incommingCalls, setIncommingCalls] = useState([])

    useEffect(() => {
      /*async function establishP2P(data: any) {
        try {
          console.log(data);
          const config = { iceServers: data.iceServers };
          const peerConnection = new RTCPeerConnection(config);

          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit('answer', {sdp:answer.sdp})
        } catch (error) {
          console.error("Error setting up PeerConnection:", error);
        }
      }
      socket.on("receive-offer", establishP2P);
    
      return () => {
          socket.off("receive-offer", establishP2P);
    
        };*/
        const peer = new Peer(  {
            host: 'localhost',
            port:9000,
            debug: 1,
            path: "/myapp",
          },);
        peer.on("call", (call) => {
           console.log(call)
        });
    }, [socket]);
  return (

      <div
        id="controls"
        className="flex items-center justify-between w-full mb-4"
      >
        <div title="Edit this page" className="inline-block text-gray-400">
          <a href="/pages/edit/china">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#AAA"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#edit"></use>
            </svg>
          </a>
        </div>{" "}
        <div className="text-right md:text-center">
          <div className="flex items-center relative w-40">
            <div
              className="status-select h-8"
              style={{maxWidth: "100%", width: "100%"}}
            >
              <div className="relative h-full">
                <button
                  type="button"
                  className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer"
                >
                  <span className="flex items-center">
                    <span className="status-dot online mr-3"></span>{" "}
                    <span className="text-gray-600 leading-none text-xs">
                      Always Online
                    </span>
                  </span>{" "}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {" "}
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}



export default IncommingCalls