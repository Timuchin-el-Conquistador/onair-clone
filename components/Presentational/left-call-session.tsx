"use client";



function LeftCallSession() {
  return (

    
    <div
      id="visitor-dialog"
      className="modal-dialog no-transition visible"
      style={{
        position: "relative",
        top: "0",
        left: "0",
        height: "fit-content",
      }}
    >
      <div id="conference-container">
        <div className="text-center">
          You have left the channel.{" "}
          <span className="text-blue-500 cursor-pointer">Refresh</span> to
          rejoin.
        </div>{" "}
      </div>
    </div>
  );
}

export default LeftCallSession;
