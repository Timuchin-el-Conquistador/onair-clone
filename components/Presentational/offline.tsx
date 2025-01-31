

type PageProps = {
    linkName:string,
    message:string
  }
  
  function UrlIsOffline(props:PageProps) {
  return (
    <div
      id="visitor-dialog"
      className="modal-dialog no-transition visible"
      style={{ position: "relative", top: "0", left: "0", height:'fit-content' }}
    >
      <div className="status-card m-3">
        <div className="status offline"></div>{" "}
        <div className="title">{props.linkName}</div>{" "}
        <div className="subtitle">Offline</div>
      </div>{" "}
      <div>
        <div className="m-3 mt-5 max-w-xl">{props.message}</div>
      </div>
    </div>
  );
}



export default UrlIsOffline