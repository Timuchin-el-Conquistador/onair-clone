import { Link } from "./links";



export enum AccountStatus {
  ACTIVE = "active",         // User is active and has an active subscription
  INACTIVE = "inactive",     // User is inactive (e.g., did not renew subscription)
  BLOCKED = "blocked",       // Admin has blocked the user
  PENDING = "pending",       // Account is pending verification or approval
 // EXPIRED = "expired",       // Subscription has expired
  SUSPENDED = "suspended",   // Temporarily suspended due to some issue
}


// Subscription status enum
export enum SubscriptionStatus {
  ACTIVE = "active",
  TRIALING = "trialing",
  PAST_DUE = "past_due",
  CANCELED = "canceled",
  UNPAID = "unpaid",
  PENDING = "pending",      
}


export interface User {
  id: string;
  fullName: string;
  email: string;
  accountStatus:AccountStatus
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
  accountStatus:AccountStatus
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
  subscriptionStatus:SubscriptionStatus,
  monthlyIntegrationsCapacity:number,
  browserNotifications:boolean,
  accountStatus:AccountStatus
  [key: string]: unknown;
}