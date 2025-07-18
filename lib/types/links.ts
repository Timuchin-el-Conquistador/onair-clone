
import { type Integration } from "./integration";

export interface Link {
  _id?: string;
  slug: string;
  connectedDevices: Integration[];
  stores:Integration[],
  callStrategy: string | null;
  availability: string;
  linkName: string;
  settings: Settings;
  owner:{email:string,_id:string,fullName:string}
}

export interface Settings {
  visitorForm: string[];
  onlineMessage: string;
  offlineMessage: string;
  recording: boolean;
}

export interface ExtendedLink extends Link {
  totalCallDuration: number;
  hasConnectedDevice: boolean;
}
