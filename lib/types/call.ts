import { User } from "./user";

export interface Session {
    _id: string;
    callerInfo: {
      uuid:string,
      fullName:string,
      email:string|null,
      phone:string|null
    };
    callStatus: "waiting" | "missed" | "live" | "ended";
    duration: number;
    callStartedTime: string;
    callAnsweredTime: string;
    callEndedTime: string;
    callAnsweredBy: string;
    callEndedBy: string;
    peerId:string,
  }
  export interface Call {
    _id: string;
    slug: string;
    owner: User;
    callerInfo: Object;
    callStatus: "waiting" | "missed" | "live" | "ended"|'declined';
    duration: number;
    callStartedTime: string;
    callAnsweredTime: string;
    callEndedTime: string;
    callAnsweredBy: string;
    callEndedBy: string;
    peerId:string,
    socketId:string,
    callAudioRecordUrl:string
  }
  