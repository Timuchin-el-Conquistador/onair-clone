"use client";

import Image from "next/image";

import '@/styles/500.scss'

function NoPageFound() {
  return (
    <div className="container">
      <Image src="/500.png" alt="400" width="80" height="80" />{" "}
      <h1>
        <span>404</span> <br />
       No page Found
      </h1>

    </div>
  );
}


export default NoPageFound