import { Device } from "./device";

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
  devices:Device[]
};
