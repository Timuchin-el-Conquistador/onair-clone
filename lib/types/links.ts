export type Integration = {
  _id: string;
  name: string;
  type: string;
};

export interface Link {
  _id?: string;
  slug: string;
  availability: string;
  linkName: string;
  integrations: Integration[];
  timeLength?: number;
  settings?:Settings
}


export interface Settings{
  visitorForm: string[]
  onlineMessage: string
  offlineMessage: string
  recording: boolean
}