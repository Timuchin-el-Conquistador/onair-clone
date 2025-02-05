import { Session } from "@/lib/types/user";

import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);



// Encrypt (Sign) a Token
export async function encrypt(payload: Session) {
  return new SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(encodedKey);
}

// Decrypt (Verify) a Token
export async function decrypt(token: string|undefined='' ) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.log("Failed to verify session");
    return null
  }
}


// Validate a Token (e.g., in middleware)
export async function validateToken(token: string) {
  const session = await decrypt(token);
  if (!session || !session.id) return null;
  //ill need to write backed user validation (send request to check if user exist)
  return {
    isAuth: true,
    id: session.id,
    email: session.email,
    fullName: session.fullName,
    subscriptionStatus: session.subscriptionStatus,
    planName:session.planName,
    monthlyMinutesCapacity:session.monthlyMinutesCapacity,
    monthlyLinksCapacity:session.monthlyLinksCapacity,
    monthlyIntegrationsCapacity:session.monthlyIntegrationsCapacity,
    accountStatus:session.accountStatus,
    watchedTutorial:session.watchedTutorial
  };


}


