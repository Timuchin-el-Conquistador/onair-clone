

import Peer from "peerjs";



const peer:Peer = new Peer({
  host: "localhost",
  port: 9000,
  path: "/myapp",
});


export default peer;
