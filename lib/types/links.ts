import { type Device } from "./device";

export type Integration = {
  _id: string;
  name: string;
  type: string;
};

export interface Link {
  _id?: string;
  slug: string;
  connectedDevices: Device[];
  callStrategy: string | null;
  availability: string;
  linkName: string;
  integrations: Integration[];
  settings: Settings;
}

export interface Settings {
  visitorForm: string[];
  onlineMessage: string;
  offlineMessage: string;
  recording: boolean;
}

export interface ExtendedLink
  extends Link{
  timeLength: number;
  hasConnectedDevice: boolean;
}
