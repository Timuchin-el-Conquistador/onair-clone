import { Link } from "./links";

export interface User {
  fullName: string;
  email: string;
  subscriptionId: null | string;
  _id: string;
}
export interface NewUser {
  fullName: string;
  email: string;
  password: string | null;
  confirmPassword: string | null;
  // subscription:null|any
}

export interface SessionUser {
  fullName: string;
  email: string;
  userId: string;
  subscriptionId: null | string;
  [key: string]: unknown; // Allows additional string keys

}


export interface  Integration  {
  integrationType: string;
  owner: User;
  integratedOn: string;
  _id: string;
  createdOn: string;
  lastLogin: string;
  name: string;
  uuid: string;
  [key: string]: unknown;
  links:Link[]
  toObject: () => Integration;
};
