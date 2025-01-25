import { User } from "./user";

export interface Device {
    _id:string,
    createdOn: string;
    lastLogin:string,
    description: string;
   // owner:User
   ownerFullName:string,
    //appVersion: string;
    //country: string;
    //city: string;
    //SIM: {
      //simState: string;
      //simCountryISO: string;
     // simOperator: string;
      //simOperatorName: string;
    //};
    //socketId: string | null;
    //isOnline: boolean;
    //uuid:string
  }
  