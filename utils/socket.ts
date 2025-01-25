import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? `${
     typeof window == "undefined"
          ? process.env.PRODUCTION_BACKEND_URL
          : process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL
      }`
    : "http://localhost:8877";

const config =
  process.env.NODE_ENV === "production"
    ? { autoConnect: false, path: "/shopline/socket.io" }
    : { autoConnect: false };
export const socket = io(URL, config);
