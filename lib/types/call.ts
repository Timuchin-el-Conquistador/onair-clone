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
  