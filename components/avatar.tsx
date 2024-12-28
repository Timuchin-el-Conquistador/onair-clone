"use client";

import DefaultImage from "@/public/avatar.png";

import Image from "next/image";

import "@/styles/avatar/index.scss";

import Link from "next/link";

import { useUserStore } from "@/providers/user";

import { useEffect, useState } from "react";

function Avatar() {
  const { user, loading } = useUserStore((state) => state);
  const [imgUrlState, setImgUrlState] = useState(
    user?.profilePhoto || DefaultImage
  );

/*
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>*/
  useEffect(()=> {
    setImgUrlState(user?.profilePhoto || DefaultImage)
  }, [loading])

  const tailwindAnimationClasses = 'animate-pulse flex space-x-4'
  return (
    <div className=" avatar flex items-center gap-2">


      <div className={loading  ? tailwindAnimationClasses : ''}>
        <Image
          src={imgUrlState}
          alt="user avatar"
          onError={() => {
            setImgUrlState(DefaultImage);
          }}
          width={50}
          height={50}
        />
        <Link href="/edit-avatar" className="avatar__edit-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M5.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11H7.5C10 11 11 10 11 7.5V6.5"
              stroke="white"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.01994 1.51L4.07994 5.45C3.92994 5.6 3.77994 5.89501 3.74994 6.11001L3.53494 7.615C3.45494 8.16 3.83994 8.54001 4.38494 8.46501L5.88994 8.25001C6.09994 8.22001 6.39494 8.07001 6.54994 7.92001L10.4899 3.98C11.1699 3.3 11.4899 2.51 10.4899 1.51C9.48994 0.510004 8.69994 0.830004 8.01994 1.51Z"
              stroke="white"
              strokeWidth="0.7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.45508 2.075C7.79008 3.27 8.72508 4.205 9.92508 4.545"
              stroke="white"
              strokeWidth="0.7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <p>{user?.fullName}</p>
    </div>
  );
}

export default Avatar;
