
import { fakeBackend } from "../axios";

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
  
  