"use client";

import Image from "next/image";

import '@/styles/500.scss'

function InternalServerError() {
  return (
    <div className="container">
      <Image src="/500.png" alt="500" width="80" height="80" />{" "}
      <h1>
        <span>500</span> <br />
        Internal server error
      </h1>
      <p>We are currently trying to fix the problem.</p>

    </div>
  );
}


export default InternalServerError