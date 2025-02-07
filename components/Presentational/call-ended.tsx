"use client";




function CallEnded(props: { isAuth: boolean; slug: string; domain: string }) {
  return (
    <div
      id="visitor-dialog"
      className="modal-dialog no-transition visible"
      style={{ position: "relative", top: "0", left: "0", height:'fit-content' }}
    >
      <div id="conference-container">
        <div className="p-6">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700">Call ended</h2>
          </div>{" "}
          <p className="text-gray-700 mt-2">
            This call is no longer active.{" "}
            {!props.isAuth && (
              <span>
                You can start a new one from the{" "}
                <a
                  href={`${props.domain}/${props.slug}`}
                  className="text-blue-500"
                >
                  call link
                </a>
                .
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CallEnded;
