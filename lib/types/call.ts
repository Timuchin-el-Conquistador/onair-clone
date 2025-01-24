import { Link } from "./links";
import { User } from "./user";

export interface Call {
  _id: string;
  slug: string;
  owner: User;
  callerInfo: {
    uuid: string;
    fullName: string;
    email: string | null;
    phone: string | null;
  };
  callStatus: "waiting" | "missed" | "live" | "ended" | "declined";
  duration: number;
  callStartedTime: string;
  callAnsweredTime: string;
  callEndedTime: string;
  callAnsweredBy: string;
  callEndedBy: string;
  peerId: string;
  callAudioRecordUrl: string;
  link: Link;
}
