"use client";

import "@/styles/calls/active-session.scss";

import { useEffect, useRef, useState } from "react";

import { socket } from "@/utils/socket";
import Peer, { DataConnection } from "peerjs";
import { formatHHMMSSTime } from "@/utils/timer";

import Image from "next/image";

type ComponentProps = {
  slug: string;
  sessionId: string;
  leaveSession: (callId: string) => void;
};

function Session(props: ComponentProps) {
  const [isCallConEstablished, setCallConnectionState] = useState(false);

  const [time, setTime] = useState(0); // time in seconds

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isRemoteStreamMuted, setRemoteStreamIsMuted] = useState(false);

  const peerRef = useRef<Peer | null>(null);

  const connRef = useRef<DataConnection | null>(null);

  const [boxShadow, setBoxShadow] = useState("none"); // Initial box-shadow

  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted; // Toggle mute state
        setIsMuted(!isMuted);
      }
    }
  };

  function createPeer({ iceServers }: any) {
       const isProduction =  process.env.NODE_ENV == "production"
    peerRef.current = new Peer({
      host:
      isProduction
          ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL
          : "localhost", // Your public IP or domain
      port:isProduction ? 443 : 9000, // The port your PeerJS server is running on
      path: "/myapp", // The path to your PeerJS server (configured in Apache)
      secure: isProduction, // Set to true if using https
      config: {
        iceServers: iceServers.urls.map((url: string) => ({
          urls: url, // Each URL should be a string
          username: iceServers.username, // TURN server username
          credential: iceServers.credential, // TURN server credential
        })),
      },
    });

    peerRef.current?.on("open", function (id) {});
    peerRef.current!.on("call", (call) => {
      call.answer(localAudioRef.current!.srcObject as MediaStream); // Answer the call
      call.on("stream", (stream) => {
        setCallConnectionState(true);

        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = stream;
        }
        startAudioVisualProcessing(stream);
      });
    });
  }

  useEffect(() => {
    socket.emit("join-session", { callId: props.sessionId });
    socket.on("ice-servers", createPeer);
    return () => {
      socket.off("ice-servers", createPeer);
    };
  }, [socket]);

  useEffect(() => {
    function setConnection(data: { peerId: string }) {

      connRef.current = peerRef.current!.connect(data.peerId);

      connRef.current.on("open", function () {
        connRef.current!.on("data", function (data) {});
        //connRef.current!.send("Hello World");
      });

      connRef.current.on("close", () => {
        setCallConnectionState(false);
      });
    }

    socket.on("offer-connection", setConnection);

    return () => {
      socket.off("offer-connection", setConnection);
    };
  }, [socket]);

  useEffect(() => {
    const getLocalStream = async () => {
      try {
        const selectedDeviceId = localStorage.getItem("audio-input-device-id");

        // Request media stream with the specified deviceId
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: selectedDeviceId
              ? { exact: selectedDeviceId }
              : undefined, // Use exact if available, fallback to default
            noiseSuppression: true, // Enable basic noise suppression
            echoCancellation: true, // Reduce echo
            autoGainControl: true, // Normalize audio levels
          },
        });

        // Set the audio stream as the local stream
        setLocalStream(stream);

        // Assign the stream to an audio element reference (for playback)
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing local audio:", error);
      }
    };

    getLocalStream();

    // Cleanup: stop the stream when the component is unmounted
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty array to ensure this effect runs once on mount






  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    props.leaveSession(props.sessionId);
  };





  
  async function startAudioVisualProcessing(stream: MediaStream) {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      analyser.fftSize = 512;
      microphone.connect(analyser);

      const calculateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume =
          dataArray.reduce((sum, value) => sum + value) / dataArray.length;

        // Scale volume to a shadow intensity (adjust these values as needed)
        const shadowIntensity = Math.min(Math.max(volume ** 1.5, 5), 50);

        setBoxShadow(
          `0 0 ${shadowIntensity}px ${
            shadowIntensity / 2
          }px rgba(0, 150, 255, 0.8)`
        );

        requestAnimationFrame(calculateVolume);
      };

      calculateVolume();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  }
  return (
    <div id="conference">
      <div id="active-audio">
        <audio
          autoPlay
          data-uid="visitor-22275"
          ref={localAudioRef}
          muted
        ></audio>
        <audio autoPlay data-uid="visitor-22275" ref={remoteAudioRef}></audio>
      </div>{" "}
      <div id="main-video">
        <video autoPlay muted playsInline className=""></video>
      </div>{" "}
      <div id="main-no-video"></div>{" "}
      <div id="participants" style={{ display: "none" }}>
        <div data-participant-uid="0" className="participant selected">
          <video autoPlay muted playsInline className="local"></video>{" "}
          <div className="participant-status text-red-600 z-10">
            {" "}
            <div className="inline-block ml-1">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#video-off"></use>
              </svg>
            </div>
          </div>{" "}
          <div className="participant-no-video">
            <div className="participant-name">Me</div>
          </div>
        </div>
        <div data-participant-uid="visitor-22275" className="participant">
          <video autoPlay muted playsInline className=""></video>{" "}
          <div className="participant-status text-red-600 z-10">
            <div className="inline-block ml-1">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#video-off"></use>
              </svg>
            </div>
          </div>{" "}
          <div className="participant-no-video">
            <div className="participant-name">User</div>
          </div>
        </div>
      </div>{" "}
      <div id="audio-only-call">
        <div className="audio-call-container">
          <div className="audio-call-header">
            <div className="text-lg font-thin">{formatHHMMSSTime(time)}</div>{" "}
            <Image
              src="/session-call-logo.png"
              alt="Profile Picture"
              width="80"
              height="80"
              style={{ boxShadow: boxShadow }}
            />{" "}
            <div className="text-2xl font-normal flex items-center">
              <span className="mr-2"></span>
              Onair
            </div>{" "}
            {!isCallConEstablished && (
              <div className="mt-1 text-red-500 text-sm font-thin">Offline</div>
            )}
            {isRemoteStreamMuted && (
              <div className="mt-1 text-red-500 text-sm font-thin">Muted</div>
            )}
          </div>{" "}
          <div className="audio-call-controls">
            <div className="flex items-center justify-evenly w-full">
              {/* <button className="p-2">
                {" "}
                <div className="icon-container active mb-2">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 43 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1646 2.13354L9.62873 9.76227H2V21.2054H9.62873L19.1646 28.8341V2.13354Z"
                      fill="#000"
                      stroke="#000"
                      strokeWidth="3.81436"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M27.8232 8.7323C29.6109 10.5205 30.6152 12.9456 30.6152 15.4742C30.6152 18.0028 29.6109 20.4278 27.8232 22.2161"
                      stroke="#000"
                      strokeWidth="3.81436"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M34.5556 2C38.131 5.57649 40.1396 10.4266 40.1396 15.4838C40.1396 20.5409 38.131 25.3911 34.5556 28.9675"
                      stroke="#000"
                      strokeWidth="3.81436"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                Speaker
              </button>{" "}*/}
              <button className="p-2" onClick={toggleMute}>
                {!isMuted ? (
                  <div className="icon-container mb-2">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.69 33.103V40M13.793 40h13.794"
                        stroke="#fff"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.11 30.606a10.775 10.775 0 0 1-15.196-9.907V17.241a1.293 1.293 0 0 0-2.586 0v3.444a13.362 13.362 0 0 0 19.71 11.85l-1.929-1.93zm4.35.253c.251-.219.495-.448.731-.686 1.181-1.011 3.46-3.734 3.665-7.215.13-.749.195-1.507.196-2.267V17.24a1.293 1.293 0 0 0-2.586 0v3.448c0 .634-.057 1.268-.17 1.893-.01.054-.015.11-.018.165-.127 2.58-1.926 4.756-2.797 5.486a1.303 1.303 0 0 0-.094.086c-.243.248-.497.484-.762.706l1.834 1.834z"
                        fill="#fff"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.655 20.152v1.4s0 6.034 6.466 6.034c.324 0 .632-.015.925-.044l-7.39-7.39zM25.09 26.49c2.496-1.74 2.496-4.938 2.496-4.938V6.034S27.586 0 21.121 0c-6.466 0-6.466 6.034-6.466 6.034v10.021L25.09 26.491z"
                        fill="#fff"
                      ></path>{" "}
                      <path
                        d="m2 1.724 37.931 37.931"
                        stroke="#fff"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="icon-container active mb-2">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.69 33.103V40M13.793 40h13.794"
                        stroke="#ff3b30"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.11 30.606a10.775 10.775 0 0 1-15.196-9.907V17.241a1.293 1.293 0 0 0-2.586 0v3.444a13.362 13.362 0 0 0 19.71 11.85l-1.929-1.93zm4.35.253c.251-.219.495-.448.731-.686 1.181-1.011 3.46-3.734 3.665-7.215.13-.749.195-1.507.196-2.267V17.24a1.293 1.293 0 0 0-2.586 0v3.448c0 .634-.057 1.268-.17 1.893-.01.054-.015.11-.018.165-.127 2.58-1.926 4.756-2.797 5.486a1.303 1.303 0 0 0-.094.086c-.243.248-.497.484-.762.706l1.834 1.834z"
                        fill="#ff3b30"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.655 20.152v1.4s0 6.034 6.466 6.034c.324 0 .632-.015.925-.044l-7.39-7.39zM25.09 26.49c2.496-1.74 2.496-4.938 2.496-4.938V6.034S27.586 0 21.121 0c-6.466 0-6.466 6.034-6.466 6.034v10.021L25.09 26.491z"
                        fill="#ff3b30"
                      ></path>{" "}
                      <path
                        d="m2 1.724 37.931 37.931"
                        stroke="#ff3b30"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                )}
                Mute
              </button>
            </div>{" "}
            <div className="flex items-center justify-evenly w-full">
              {/*  <button className="p-2 relative">
                <div className="icon-container mb-2 inline-block">
                  <span className="">
                    <svg
                      width="30"
                      height="30"
                      fill="#fff"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      id=""
                      style={{ display: "inline-block" }}
                    >
                      <use xlinkHref="/feather-sprite.svg#message-square"></use>
                    </svg>
                  </span>
                </div>{" "}
                <div
                  id="tooltip-content"
                  className="bg-black text-white text-center text-xs -left-7 -top-2.5 absolute w-32 z-10 py-1.5 rounded-md"
                  style={{ display: "none" }}
                >
                  <span className="absolute cursor-pointer bg-gray-600 h-4 w-4 justify-center items-center flex -right-1 -top-1 rounded-full">
                    <svg
                      width="10"
                      height="10"
                      fill="#fff"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      id=""
                      style={{ display: "inline-block" }}
                    >
                      <use xlinkHref="/feather-sprite.svg#x"></use>
                    </svg>
                  </span>{" "}
                  <p className="truncate px-3"></p>
                </div>
                Chat
              </button>{" "}*/}
              <button className="p-2" onClick={endCall}>
                <div className="icon-container end-session mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 122.88"
                    className="w-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M104.89,104.89a61.47,61.47,0,1,1,18-43.45,61.21,61.21,0,0,1-18,43.45ZM74.59,55.72a49.79,49.79,0,0,0-12.38-2.07A41.52,41.52,0,0,0,48,55.8a1.16,1.16,0,0,0-.74.67,4.53,4.53,0,0,0-.27,1.7,16.14,16.14,0,0,0,.2,2c.42,3,.93,6.8-2.42,8l-.22.07-12,3.24-.12,0A4.85,4.85,0,0,1,28,70a11.44,11.44,0,0,1-2.68-4.92,11,11,0,0,1,.42-6.93A23.69,23.69,0,0,1,29,52.39,21.52,21.52,0,0,1,36.55,46a42.74,42.74,0,0,1,10.33-3.6l.29-.07C49,42,51,41.48,53.08,41.17a62.76,62.76,0,0,1,25.14,1.59c6.87,2,13,5.43,16.8,10.7a13.88,13.88,0,0,1,2.92,9.59,12.64,12.64,0,0,1-4.88,8.43,1.34,1.34,0,0,1-1.26.28L78.6,68.38A3.69,3.69,0,0,1,75.41,66a7.73,7.73,0,0,1-.22-4,15.21,15.21,0,0,1,.22-1.6c.3-1.89.63-4.06-.89-4.72Z"
                      fill="#ff3b30"
                    ></path>
                  </svg>
                </div>
                Finish
              </button>{" "}
              {/*<button className="p-2">
                <div className="icon-container mb-2">
                  <svg
                    width="41"
                    height="10"
                    viewBox="0 0 41 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="5.37543" cy="5" r="5" fill="white"></circle>
                    <circle cx="20.3754" cy="5" r="5" fill="white"></circle>
                    <circle cx="35.3754" cy="5" r="5" fill="white"></circle>
                  </svg>
                </div>
                More
              </button>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session;
