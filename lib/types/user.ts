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


export interface Session{
  id:string,
  fullName: string,
  email: string,
  planName: string,
  monthlyMinutesCapacity: number,
  monthlyLinksCapacity: number,
  subscriptionStatus:string,
  monthlyIntegrationsCapacity:number,
  [key: string]: unknown;
}

export interface Account{
  id:string,
  fullName: string,
  email: string,
  planName: string,
  monthlyMinutesCapacity: number,
  monthlyLinksCapacity: number,
  numberOfCreatedLinks: number,
  monthlyMinutesConsumed: number,
  subscriptionStatus:string,
  monthlyIntegrationsCapacity:number,
  browserNotifications:boolean
  [key: string]: unknown;
}