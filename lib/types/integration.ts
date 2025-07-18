
import { Link } from "./links";
import { User } from "./user";

export interface Integration {
  integrationType: string;
  owner: User;
  integratedOn: string;
  _id: string;
  createdOn: string;
  lastLogin: string;
  name: string;
  uuid: string;
  links: Link[];
  description:string,
  toObject: () => Integration;
  status: string;
  from:string,
  store:string;
  [key: string]: unknown;
}