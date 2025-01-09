"use client";

import { useState, useEffect, useRef } from "react";

import { socket } from "@/socket";

import "@/styles/calls/visitor.scss";

import VisitorForm from "@/components/Form/visitor";

import { Peer } from "peerjs";

function Visitor() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);

  const remoteStreamRef = useRef<any>();
  const localStreamRef = useRef<any>();
  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  const connRef = useRef<any>();
  const peerRef = useRef<Peer | null>(null);
  const callRef = useRef<any>(null);


  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    
      if (localAudioRef.current) {
        // Assign the MediaStream to srcObject using a type assertion
        (localAudioRef.current as HTMLAudioElement).srcObject = stream;
        await localAudioRef.current.play();
      }
      const mediaRecorder = new MediaRecorder(stream);
  
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };


  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (audioBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(audioBlob);
      link.download = "recording.webm";
      link.click();
    }
  };

  useEffect(() => {
    peerRef.current = new Peer({
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    startRecording()

  }, []);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    async function establishP2P(data: any) {
      try {
        console.log(data);
        const config = { iceServers: data.iceServers };

        /*const pc = new RTCPeerConnection(config);

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("New ICE candidate:", event.candidate);
            // Send the candidate to your signaling server
          }
        };

        pc.onconnectionstatechange = () => {
          console.log("Connection state:", pc.connectionState);
        };
        let offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log('Offer:', offer);
        socket.emit("offer",{offer});
        setPeerConnection(pc);*/
      } catch (error) {
        console.error("Error setting up PeerConnection:", error);
      }
    }
    socket.on("receive-ice-candidate", establishP2P);

    socket.on("call", (data) => {});

    return () => {
      socket.off("receive-ice-candidate", establishP2P);
    };
  }, [socket]);

  useEffect(() => {
    // Initialize Peer
    peerRef.current?.on("open", (id: string) => {
      console.log("Peer ID:", id);
      // Example: send the peer ID via socket
      // socket.emit("initiate-call", { peerId: id, callerInfo: { name: "Cengiz Hamidov" } });
    });
    peerRef.current?.on("connection", () => {
      connRef.current.on("open", function () {
        connRef.current.on("data", function (data: any) {
          console.log("Received", data);
        });
        connRef.current.on("close", () => {
          console.log("Connection closed");
        });
        console.log("Connection with Peer B is open");
        connRef.current.send("Hello World");

        callRef.current = peerRef.current?.call(
          "61d59004-f3a1-4896-b0f4-47714597e9d3",
          localStreamRef.current
        );
        callRef.current.on("stream", (stream: any) => {
          console.log('STREAM IS ONNNNNNNNNN', stream)
          // C
          remoteStreamRef.current = stream; // A
         // setRemoteAudioConfig(() => ({stream, autoplay:true})); // B

        });
      });
    });

    // Cleanup on component unmount
    return () => {
      peerRef.current?.disconnect();
      peerRef.current = null;
    };
  }, []);
console.log(audioUrl)

  return (
    <>
      <div id="animated-background" className="">
        <div className="waiting-room-bg"></div>
        <div className="waiting-room-bg waiting-room-bg2"></div>
        <div className="waiting-room-bg waiting-room-bg3"></div>
      </div>
      <div>
      <h1>Local and Remote Audio Streams</h1>
      
      {/* Local Audio */}
      <div>
        <h2>Local Audio</h2>
      <audio ref={localAudioRef} />
      </div>
      
      {/* Remote Audio */}
 

      {/* Optional display to indicate if the local stream is ready */}

    </div>
      <VisitorForm
        initCall={() => {
          //socket.emit("register",{form});
          //  navigator.mediaDevices
          //    .getUserMedia({ video: false, audio: true })
          //    .then((stream) => {
          //       console.log(peerRef.current?.id);
          /* socket.emit("call", {
                  peerId: peer.id,
                  callerInfo: { name: "Cengiz Hamidov" },
                });*/

          connRef.current = peerRef.current?.connect(
            "61d59004-f3a1-4896-b0f4-47714597e9d3"
          )!;

          /*   })
            .catch((err) => {
              console.error("Failed to get local stream", err);
            });*/
        }}


        
      />
    </>
  );
}

export default Visitor;
