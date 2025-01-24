
import { fakeBackend } from "../axios";
import { Call } from "../types/call";

import { type ExtendedLink } from "../types/links";




export async function retrieveUrlAction(slug:string) {
  'use server'
  try {   
    const path = `api/v1/public/url/${slug}`;
    const response: { message: string; url: ExtendedLink } = await fakeBackend.get(
      path
    );
    return response.url;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
  }
  
  export async function retrieveActiveCallSession(callId:string) {
   
     try {   
   

       const path = `api/v1/public/session/${callId}`;
       const response: { message: string; session: Call } = await fakeBackend.get(
         path
       );
       return response.session;
     } catch (error) {
       return error instanceof Error ? error : new Error(String(error));
     }
    }
    
    