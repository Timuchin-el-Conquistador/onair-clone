import { Link } from "./links";

export interface User {
  id: string;
  fullName: string;
  email: string;
  accountStatus:string
  [key: string]: unknown;
}
export interface NewUser {
  fullName: string;
  email: string;
  password: string | null;
  confirmPassword: string | null;
  // subscription:null|any
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


export interface Account{
  name: string,
  email: string,
  plan: string,
  monthlyMinutesCapacity: number,
  monthlyLinksCapacity: number,
  numberOfCreatedLinks: number,
  monthlyMinutesConsumed: number,
  subscriptionStatus:string
}