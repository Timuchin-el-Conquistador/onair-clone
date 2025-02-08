import { io } from "socket.io-client";

const isProduction = process.env.NODE_ENV === "production";

const productionUrl =
  typeof window !== undefined
    ? "https://" + process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL!
    : "https://" + process.env.PRODUCTION_BACKEND_URL!;

const localhost =
  typeof window !== undefined
    ? "http://" + process.env.NEXT_PUBLIC_LOCAL_SOCKET_URL!
    : "http://" + process.env.LOCAL_SOCKET_URL!;

const config = isProduction
  ? { autoConnect: false, path: "/shopline/socket.io" }
  : { autoConnect: false };

export const socket = io(isProduction ? productionUrl : localhost, config);
