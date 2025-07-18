"use client";

import "@/styles/calls/active-session.scss";

import { useEffect, useRef, useState } from "react";

import { socket } from "@/utils/socket";

import Peer, { DataConnection } from "peerjs";

import { formatHHMMSSTime } from "@/utils/timer";

import { type Caller } from "@/lib/types/call";

import Image from "next/image";



import axios from "axios";

import AttemptingToEndActiveSessionWarning from "../modals/end-call-warning";

//import {EventStreamCodec } from '@smithy/eventstream-codec'
//import {fromUtf8,toUtf8}  from '@smithy/util-utf8'

//import mic from "microphone-stream";

//const eventStreamMarshaller = new EventStreamCodec(toUtf8,fromUtf8);


type ComponentProps = {
  userEmail: string;
  slug: string;
  sessionId: string;
  callerInfo: Caller;
  endCall: (callId: string, duration: number) => void;
};

function Session(props: ComponentProps) {
  //  const [isP2PConEstablished, setP2PConnectionState] = useState(false);
  const [isCallConEstablished, setCallConnectionState] = useState(false); //online offline

  const [time, setTime] = useState(0); // time in seconds

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isRemoteStreamMuted, setRemoteStreamMuteState] = useState(false);

  const [boxShadow, setBoxShadow] = useState("none"); // Initial box-shadow

  const peerRef = useRef<Peer | null>(null);
  const connRef = useRef<DataConnection | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const peerId = useRef<string | null>(null);

  const tryToConnectRef = useRef(true); // Create a ref to store the latest state

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const [endCallSessionWarning, setEndCallSessionWarning] = useState(false);

  const timeRefinMs = useRef(0);

  //const audioContextRef = useRef<AudioContext>();
  //const audioInputRef = useRef<MediaStreamAudioSourceNode>();
  //const audioWorkletNodeRef = useRef<AudioWorkletNode>();

  const micStreamRef = useRef<any>();
  const sampleRate = useRef<any>();
  const inputSampleRate = useRef<any>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      timeRefinMs.current += 1;
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted; // Toggle mute state
        setIsMuted(!isMuted);
      }
    }
  };

  useEffect(() => {
    function peerChangedAudioTrackMuteState(data: { isMuted: boolean }) {
      setRemoteStreamMuteState(data.isMuted);
    }
    socket.on("mute", peerChangedAudioTrackMuteState);

    return () => {
      socket.off("mute", peerChangedAudioTrackMuteState);
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join-session", { callId: props.sessionId });
    function createPeer() {
      const isProduction = process.env.NODE_ENV == "production";

      const urls = [
        ...process.env.NEXT_PUBLIC_XIRSYS_TURN_UDP!.split(","),
        ...process.env.NEXT_PUBLIC_XIRSYS_TURN_TCP!.split(","),
      ];

      peerRef.current = new Peer({
        host: isProduction
          ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL
          : "localhost", // Your public IP or domain
        port: isProduction ? 443 : 9000, // The port your PeerJS server is running on
        path: "/myapp", // The path to your PeerJS server (configured in Apache)
        secure: isProduction, // Set to true if using https
        config: {
          iceServers: urls.map((url: string) => ({
            urls: url, // Each URL should be a string
            username: process.env.NEXT_PUBLIC_XIRSYS_USERNAME, // TURN server username
            credential: process.env.NEXT_PUBLIC_XIRSYS_CREDENTIAL, // TURN server credential
          })),
        },
      });
      offerConnection();

      peerRef.current?.on("open", function (id) {
        peerId.current = id;
       // socket.emit("offer", {
       //   callId: props.sessionId,
      //    peerId: id,
    //    });
      });

      peerRef.current?.on("connection", async (connection) => {
        tryToConnectRef.current = false;
        peerRef.current!.connect(connection.peer);
        connRef.current = connection;

        connRef.current.on("open", function () {
          connRef.current!.on("data", function (data) {});
          //    connRef.current!.send("Hello World");
        });

        // Handle disconnection of the remote peer
        connRef.current.on("close", () => {
          tryToConnectRef.current = true;
          setCallConnectionState(false);
          offerConnection();
        });
        try {
          const localStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              noiseSuppression: true, // Enable noise suppression
              echoCancellation: true, // Optional: Reduce echo
              autoGainControl: true, // Optional: Normalize audio levels
            },
          });
          // Set the audio stream as the local stream
          setLocalStream(localStream);
          //  streamAudioToWebSocket(localStream)
          //startAudioProcessing();
          //  startStreaming(localStream);
          //  localMediaStreamRecorderRef.current =  createAudioRecorder(stream)
          // Assign the stream to an audio element reference (for playback)
          if (localAudioRef.current) {
            localAudioRef.current.srcObject = localStream;
          }

          const call = peerRef.current!.call(
            connection.peer,
            localAudioRef.current!.srcObject as MediaStream
          );

          call.on("stream", (remoteStream) => {
            setCallConnectionState(true);

            recordMixedAudio(localStream, remoteStream);
            /// remoteMediaStreamRecorderRef.current =  createAudioRecorder(stream)

            if (remoteAudioRef.current) {
              remoteAudioRef.current.srcObject = remoteStream;
            }
            startAudioVisualProcessing(remoteStream);
          });
        } catch (error) {
          console.error("Error accessing local audio:", error);
        }
      });
    }
    createPeer();
  }, []);
  const offerConnection = () => {
    const interval = setInterval(() => {
      if (!tryToConnectRef.current) {
        clearInterval(interval);
        return;
      }
      if (peerId.current) {
        socket.emit("offer", {
          callId: props.sessionId,
          peerId: peerId.current,
        });
      }
    }, 100);

    return interval;
  };


  /* useEffect(() => {
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            noiseSuppression: true, // Enable noise suppression
            echoCancellation: true, // Optional: Reduce echo
            autoGainControl: true, // Optional: Normalize audio levels
          },
        });

        // Set the audio stream as the local stream
        setLocalStream(stream);
      //  localMediaStreamRecorderRef.current =  createAudioRecorder(stream)
        // Assign the stream to an audio element reference (for playback)
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing local audio:", error);
      }
    };

    getLocalStream();

    return () => {
      peerRef.current?.disconnect();
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);*/

  function recordMixedAudio(
    localStream: MediaStream,
    remoteStream: MediaStream
  ) {
    if (!localStream || !remoteStream) {
      console.error("Local or remote stream is missing!");
      return;
    }

    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();

    // Convert both streams to audio sources
    const localSource = audioContext.createMediaStreamSource(localStream);
    const remoteSource = audioContext.createMediaStreamSource(remoteStream);

    // Connect both sources to the destination
    localSource.connect(destination);
    remoteSource.connect(destination);

    // The mixed stream
    const mixedStream = destination.stream;

    // Start recording
    const mediaRecorder = new MediaRecorder(mixedStream);
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const isProduction = process.env.NODE_ENV == "production";
      const domain = isProduction
        ? `https://${process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL}`
        : `http://${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}`;
      const audioBlob = new Blob(chunks, { type: "audio/mp3" });
      const form = new FormData();
      form.append("audio-record", audioBlob);
      await axios.post(
        `${domain}/api/v1/user/${props.userEmail}/calls/${props.sessionId}`,
        form
      );
    };
    setMediaRecorder(mediaRecorder);
    mediaRecorder.start();
  }
  const stopMediaRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    // stopStreaming();
  };

  const endCall = async () => {
    stopMediaRecording();
    props.endCall(props.sessionId, timeRefinMs.current);
  };

  useEffect(() => {
    socket.on("call-ended", stopMediaRecording);

    return () => {
      socket.off("call-ended", stopMediaRecording);
    };
  }, []);

  useEffect(() => {
    function peerLeftTheSession() {
      //if visitor left session and did not rejoined
      setCallConnectionState(false);
      setTimeout(() => {
        tryToConnectRef.current = false;
        stopMediaRecording();
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
        }
      }, 3 * 1000 * 1000);
    }
    socket.on("peer-left", peerLeftTheSession);

    return () => {
      socket.off("peer-left", peerLeftTheSession);
    };
  }, [socket]);

  //audio speaking effect
  async function startAudioVisualProcessing(stream: MediaStream) {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      analyser.fftSize = 512;
      microphone.connect(analyser);

      const calculateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume =
          dataArray.reduce((sum, value) => sum + value) / dataArray.length;

        // Scale volume to a shadow intensity (adjust these values as needed)
        const shadowIntensity = Math.min(Math.max(volume ** 1.5, 5), 50);

        setBoxShadow(
          `0 0 ${shadowIntensity}px ${
            shadowIntensity / 2
          }px rgba(0, 150, 255, 0.8)`
        );

        requestAnimationFrame(calculateVolume);
      };

      calculateVolume();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  }

  //transcription stream

  // Start Recording
  /*
  const startStreaming = async (stream: MediaStream) => {
    console.log("Start button clicked");
    try {
      // Create AudioContext if not already created
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      audioInputRef.current =
        audioContextRef.current.createMediaStreamSource(stream);

      // Create AudioWorkletNode
      await audioContextRef.current.audioWorklet.addModule(
        "/worklet-processor.js"
      );
      console.log("AudioWorklet module loaded successfully.");

      audioWorkletNodeRef.current = new AudioWorkletNode(
        audioContextRef.current,
        "my-worklet-processor"
      );

      console.log(audioContextRef.current);
      audioInputRef.current.connect(audioWorkletNodeRef.current);
      audioWorkletNodeRef.current.connect(audioContextRef.current.destination);

      // Handle audio processing in worklet processor
      audioWorkletNodeRef.current.port.onmessage = (event) => {
        const audioChunk = event.data;  // This is the Int16Array.buffer sent from the AudioWorkletProcessor
        console.log('Sending audio chunk to server, size:', audioChunk);
      
        // Handle WebSocket emission here
        socket.emit('audioData', audioChunk);
      };

      socket.emit("startTranscription");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopStreaming = () => {
    if (
      audioContextRef.current &&
      audioContextRef.current.state !== "closed" &&
      audioInputRef.current &&
      audioWorkletNodeRef.current
    ) {
      audioInputRef.current.disconnect();
      audioWorkletNodeRef.current.disconnect();
      audioContextRef.current.close();
      socket.emit("stopTranscription");

      audioInputRef.current.mediaStream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  */
 /*
  let streamAudioToWebSocket = function (userMediaStream: MediaStream) {
    //let's get the mic input from the browser, via the microphone-stream module
    micStreamRef.current = new mic();

    micStreamRef.current.on("format", function (data: any) {
      inputSampleRate.current = data.sampleRate;
    });

    micStreamRef.current.setStream(userMediaStream);

    // Pre-signed URLs are a way to authenticate a request (or WebSocket connection, in this case)
    // via Query Parameters. Learn more: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
    // let url = createPresignedUrl();

    //open up our WebSocket connection
    //  socket = new WebSocket(url);
    //  socket.binaryType = "arraybuffer";

    let sampleRate = 0;

    // when we get audio data from the mic, send it to the WebSocket if possible
    // socket.onopen = function () {
    micStreamRef.current.on("data", function (rawAudioChunk: any) {

      // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
      let binary = convertAudioToBinaryMessage(rawAudioChunk);

      console.log("binary", binary)
      //  if (socket.readyState === socket.OPEN) socket.send(binary);
      socket.emit("audioData", binary);
    });
    //   };

    // handle messages, errors, and close events
    // wireSocketEvents();

    socket.emit("startTranscription");
  };
  function convertAudioToBinaryMessage(audioChunk: any) {
    let raw = mic.toRaw(audioChunk);

    if (raw == null) return;

    // downsample and convert the raw audio bytes to PCM
    let downsampledBuffer = downsampleBuffer(raw, inputSampleRate.current, sampleRate.current);
    let pcmEncodedBuffer = pcmEncode(downsampledBuffer);

    // add the right JSON headers and structure to the message
    let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

    //convert the JSON object + headers into a binary event stream message
    let binary = eventStreamMarshaller.encode(audioEventMessage as any);

    return binary;
  }

  function pcmEncode(input: any) {
    var offset = 0;
    var buffer = new ArrayBuffer(input.length * 2);
    var view = new DataView(buffer);
    for (var i = 0; i < input.length; i++, offset += 2) {
      var s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  }

  function downsampleBuffer(
    buffer: any,
    inputSampleRate = 44100,
    outputSampleRate = 16000
  ) {
    if (outputSampleRate === inputSampleRate) {
      return buffer;
    }

    var sampleRateRatio = inputSampleRate / outputSampleRate;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Float32Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;

    while (offsetResult < result.length) {
      var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);

      var accum = 0,
        count = 0;

      for (
        var i = offsetBuffer;
        i < nextOffsetBuffer && i < buffer.length;
        i++
      ) {
        accum += buffer[i];
        count++;
      }

      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }

    return result;
  }
  function getAudioEventMessage(buffer: any) {
    // wrap the audio data in a JSON envelope
    return {
      headers: {
        ":message-type": {
          type: "string",
          value: "event",
        },
        ":event-type": {
          type: "string",
          value: "AudioEvent",
        },
      },
      body: buffer,
    };
  }*/
  return (
    <div id="conference">
      <div id="active-audio">
        <audio
          autoPlay
          data-uid="visitor-22275"
          ref={localAudioRef}
          muted
        ></audio>
        <audio autoPlay data-uid="visitor-22275" ref={remoteAudioRef}></audio>
      </div>{" "}
      <div id="main-video">
        <video autoPlay muted playsInline className=""></video>
      </div>{" "}
      <div id="main-no-video"></div>{" "}
      <div id="participants" style={{ display: "none" }}>
        <div data-participant-uid="0" className="participant selected">
          <video autoPlay muted playsInline className="local"></video>{" "}
          <div className="participant-status text-red-600 z-10">
            {" "}
            <div className="inline-block ml-1">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#video-off"></use>
              </svg>
            </div>
          </div>{" "}
          <div className="participant-no-video">
            <div className="participant-name">Me</div>
          </div>
        </div>
        <div data-participant-uid="visitor-22275" className="participant">
          <video autoPlay muted playsInline className=""></video>{" "}
          <div className="participant-status text-red-600 z-10">
            <div className="inline-block ml-1">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#video-off"></use>
              </svg>
            </div>
          </div>{" "}
          <div className="participant-no-video">
            <div className="participant-name">User</div>
          </div>
        </div>
      </div>{" "}
      <div id="audio-only-call">
        <div className="audio-call-container">
          <div className="audio-call-header">
            <div className="text-lg font-thin">{formatHHMMSSTime(time)}</div>{" "}
            <Image
              src="/avatar.png"
              alt="Profile Picture"
              width="80"
              height="80"
              style={{ boxShadow: boxShadow }}
            />{" "}
            <div className="text-2xl font-normal flex items-center">
              <span className="mr-2"></span>
              {props.callerInfo.fullName}
            </div>{" "}
            <div className="mt-1 text-gray-400 text-xl font-thin">
              {props.callerInfo.email}
            </div>{" "}
            {!isCallConEstablished && (
              <div className="mt-1 text-red-500 text-sm font-thin">Offline</div>
            )}
            {isRemoteStreamMuted && (
              <div className="mt-1 text-red-500 text-sm font-thin">Muted</div>
            )}
          </div>{" "}
          <div className="audio-call-controls">
            <div className="flex items-center justify-evenly w-full">
              {/* <button className="p-2">
                {" "}
                <div className="icon-container active mb-2">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 43 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1646 2.13354L9.62873 9.76227H2V21.2054H9.62873L19.1646 28.8341V2.13354Z"
                      fill="#000"
                      stroke="#000"
                      strokeWidth="3.81436"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M27.8232 8.7323C29.6109 10.5205 30.6152 12.9456 30.6152 15.4742C30.6152 18.0028 29.6109 20.4278 27.8232 22.2161"
                      stroke="#000"
                      strokeWidth="3.81436"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M34.5556 2C38.131 5.57649 40.1396 10.4266 40.1396 15.4838C40.1396 20.5409 38.131 25.3911 34.5556 28.9675"
                      stroke="#000"
                      strokeWidth="3.81436"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                Speaker
              </button>{" "}*/}
              <button className="p-2" onClick={toggleMute}>
                {!isMuted ? (
                  <div className="icon-container mb-2">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.69 33.103V40M13.793 40h13.794"
                        stroke="#fff"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.11 30.606a10.775 10.775 0 0 1-15.196-9.907V17.241a1.293 1.293 0 0 0-2.586 0v3.444a13.362 13.362 0 0 0 19.71 11.85l-1.929-1.93zm4.35.253c.251-.219.495-.448.731-.686 1.181-1.011 3.46-3.734 3.665-7.215.13-.749.195-1.507.196-2.267V17.24a1.293 1.293 0 0 0-2.586 0v3.448c0 .634-.057 1.268-.17 1.893-.01.054-.015.11-.018.165-.127 2.58-1.926 4.756-2.797 5.486a1.303 1.303 0 0 0-.094.086c-.243.248-.497.484-.762.706l1.834 1.834z"
                        fill="#fff"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.655 20.152v1.4s0 6.034 6.466 6.034c.324 0 .632-.015.925-.044l-7.39-7.39zM25.09 26.49c2.496-1.74 2.496-4.938 2.496-4.938V6.034S27.586 0 21.121 0c-6.466 0-6.466 6.034-6.466 6.034v10.021L25.09 26.491z"
                        fill="#fff"
                      ></path>{" "}
                      <path
                        d="m2 1.724 37.931 37.931"
                        stroke="#fff"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="icon-container active mb-2">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.69 33.103V40M13.793 40h13.794"
                        stroke="#ff3b30"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.11 30.606a10.775 10.775 0 0 1-15.196-9.907V17.241a1.293 1.293 0 0 0-2.586 0v3.444a13.362 13.362 0 0 0 19.71 11.85l-1.929-1.93zm4.35.253c.251-.219.495-.448.731-.686 1.181-1.011 3.46-3.734 3.665-7.215.13-.749.195-1.507.196-2.267V17.24a1.293 1.293 0 0 0-2.586 0v3.448c0 .634-.057 1.268-.17 1.893-.01.054-.015.11-.018.165-.127 2.58-1.926 4.756-2.797 5.486a1.303 1.303 0 0 0-.094.086c-.243.248-.497.484-.762.706l1.834 1.834z"
                        fill="#ff3b30"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.655 20.152v1.4s0 6.034 6.466 6.034c.324 0 .632-.015.925-.044l-7.39-7.39zM25.09 26.49c2.496-1.74 2.496-4.938 2.496-4.938V6.034S27.586 0 21.121 0c-6.466 0-6.466 6.034-6.466 6.034v10.021L25.09 26.491z"
                        fill="#ff3b30"
                      ></path>{" "}
                      <path
                        d="m2 1.724 37.931 37.931"
                        stroke="#ff3b30"
                        strokeWidth="2.586"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                )}
                Mute
              </button>
            </div>{" "}
            <div className="flex items-center justify-evenly w-full">
              {/*  <button className="p-2 relative">
                <div className="icon-container mb-2 inline-block">
                  <span className="">
                    <svg
                      width="30"
                      height="30"
                      fill="#fff"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      id=""
                      style={{ display: "inline-block" }}
                    >
                      <use xlinkHref="/feather-sprite.svg#message-square"></use>
                    </svg>
                  </span>
                </div>{" "}
                <div
                  id="tooltip-content"
                  className="bg-black text-white text-center text-xs -left-7 -top-2.5 absolute w-32 z-10 py-1.5 rounded-md"
                  style={{ display: "none" }}
                >
                  <span className="absolute cursor-pointer bg-gray-600 h-4 w-4 justify-center items-center flex -right-1 -top-1 rounded-full">
                    <svg
                      width="10"
                      height="10"
                      fill="#fff"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      id=""
                      style={{ display: "inline-block" }}
                    >
                      <use xlinkHref="/feather-sprite.svg#x"></use>
                    </svg>
                  </span>{" "}
                  <p className="truncate px-3"></p>
                </div>
                Chat
              </button>{" "}*/}
              <button
                className="p-2"
                onClick={() => {
                  setEndCallSessionWarning(true);
                }}
              >
                <div className="icon-container end-session mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 122.88"
                    className="w-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M104.89,104.89a61.47,61.47,0,1,1,18-43.45,61.21,61.21,0,0,1-18,43.45ZM74.59,55.72a49.79,49.79,0,0,0-12.38-2.07A41.52,41.52,0,0,0,48,55.8a1.16,1.16,0,0,0-.74.67,4.53,4.53,0,0,0-.27,1.7,16.14,16.14,0,0,0,.2,2c.42,3,.93,6.8-2.42,8l-.22.07-12,3.24-.12,0A4.85,4.85,0,0,1,28,70a11.44,11.44,0,0,1-2.68-4.92,11,11,0,0,1,.42-6.93A23.69,23.69,0,0,1,29,52.39,21.52,21.52,0,0,1,36.55,46a42.74,42.74,0,0,1,10.33-3.6l.29-.07C49,42,51,41.48,53.08,41.17a62.76,62.76,0,0,1,25.14,1.59c6.87,2,13,5.43,16.8,10.7a13.88,13.88,0,0,1,2.92,9.59,12.64,12.64,0,0,1-4.88,8.43,1.34,1.34,0,0,1-1.26.28L78.6,68.38A3.69,3.69,0,0,1,75.41,66a7.73,7.73,0,0,1-.22-4,15.21,15.21,0,0,1,.22-1.6c.3-1.89.63-4.06-.89-4.72Z"
                      fill="#ff3b30"
                    ></path>
                  </svg>
                </div>
                Finish
              </button>{" "}
              {/*<button className="p-2">
                <div className="icon-container mb-2">
                  <svg
                    width="41"
                    height="10"
                    viewBox="0 0 41 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="5.37543" cy="5" r="5" fill="white"></circle>
                    <circle cx="20.3754" cy="5" r="5" fill="white"></circle>
                    <circle cx="35.3754" cy="5" r="5" fill="white"></circle>
                  </svg>
                </div>
                More
              </button>*/}
            </div>
          </div>
        </div>
      </div>
      <AttemptingToEndActiveSessionWarning
        isOpen={endCallSessionWarning}
        closeModal={() => {
          setEndCallSessionWarning(false);
        }}
        endCallSession={endCall}
      />
    </div>
  );
}

export default Session;
