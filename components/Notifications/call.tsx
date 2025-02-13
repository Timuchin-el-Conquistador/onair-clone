"use client";

import { useEffect, useRef } from "react";

type ComponentProps = {
  email: string|null;
  fullName: string;
  phone: string|null;
  callId: string;
  slug:string
  answer: (slug:string,callId: string) => void;
  decline: (callId: string) => void;
};

function WebCallNotification(props: ComponentProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    /* используем поток */
    if (audioRef.current) {
      audioRef.current.src = "/audio/phone-ringtone.mp3";
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio stream:", error);
      });
    }
  }, []);
  return (
    <div
      id="web-call-notification-container"

    >
      <audio ref={audioRef}></audio>
      <div className="bg-black shadow-lg rounded-3xl py-2 px-3 flex items-center justify-center">
        <button
          className="flex items-center justify-center bg-red-500 text-white text-sm font-medium rounded-full w-9 h-9 focus:outline-none hover:bg-red-600"
          onClick={() => props.decline(props.callId)}
        >
          <svg
            width="18"
            height="18"
            fill="white"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            id=""
            style={{ display: "inline-block", rotate: "-180deg" }}
          >
            <use xlinkHref="/feather-sprite.svg#phone"></use>
          </svg>
        </button>{" "}
        <div className="flex flex-col justify-center items-center px-4 relative min-w-[160px] max-w-[208px] truncate">
          <p className="text-sm font-medium text-white w-full truncate">
            {props.fullName}
          </p>{" "}
          <p className="text-white text-sm w-full truncate">{props.email}</p>
        </div>{" "}
        <button
          className="flex items-center justify-center bg-green-500 text-white text-sm font-medium pulse-effect rounded-full w-9 h-9 rounded hover:bg-green-600"
          onClick={() => props.answer(props.slug,props.callId)}
        >
          <svg
            width="18"
            height="18"
            fill="white"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            id=""
            style={{ display: "inline-block" }}
          >
            <use xlinkHref="/feather-sprite.svg#phone"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WebCallNotification;
