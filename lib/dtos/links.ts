export type Integration = {
  _id: string;
  name: string;
  type: string;
};

export interface Link {
  _id: string;
  slug: string;
  availability: string;
  linkName: string;
  integrations: Integration[];
  timeLength: number;
}
