import { io } from "socket.io-client";

const productionUrl =
  typeof window !== undefined
    ? "https://" + process.env.PRODUCTION_BACKEND_URL
    : "https://" + process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL;

const config =
  process.env.NODE_ENV === "production"
    ? { autoConnect: false, path: "/shopline/socket.io" }
    : { autoConnect: false };
export const socket = io(
  process.env.NODE_ENV == "production"
    ? productionUrl
    : "http://localhost:8877",
  config
);
