"use client";


import "@/styles/calls/waiting-room.scss";

import VisitorForm from "@/components/Form/visitor";

function Visitor() {


  return (
    <>
      <div id="animated-background" className="">
        <div className="waiting-room-bg"></div>
        <div className="waiting-room-bg waiting-room-bg2"></div>
        <div className="waiting-room-bg waiting-room-bg3"></div>
      </div>

      <VisitorForm />
    </>
  );
}

export default Visitor;
