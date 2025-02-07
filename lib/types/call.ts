import { Link } from "./links";
import { User } from "./user";

export interface Caller {
  info: {
    browser: string;
    operatingSystem: string;
    device: string;
  };
  fullName: string;
  email: string | null;
  phone: string | null;
  country: string,
  countryCode: string,
  capital: string,
  latitude: number,
  longitude: number
}

export interface Call {
  _id: string;
  slug: string;
  owner: User;
  callerInfo: Caller;
  callStatus: "waiting" | "missed" | "live" | "ended" | "declined"|'left';
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
