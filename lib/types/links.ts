import { type Device } from "./device";
import { type User, type Integration } from "./user";

export interface Link {
  _id?: string;
  slug: string;
  connectedDevices: Device[];
  callStrategy: string | null;
  availability: string;
  linkName: string;
  integrations: Integration[];
  settings: Settings;
  owner:string
}

export interface Settings {
  visitorForm: string[];
  onlineMessage: string;
  offlineMessage: string;
  recording: boolean;
}

export interface ExtendedLink
  extends Link{
    totalCallDuration: number;
  hasConnectedDevice: boolean;
}
