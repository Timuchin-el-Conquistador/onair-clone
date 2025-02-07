"use client";

import { socket } from "@/utils/socket";

import { useEffect } from "react";

function SocketConnectionLayout({
  isAuth,
  userId,
  children
}: {
  isAuth: boolean;
  userId: string | null;
  children:React.ReactNode
}) {
  useEffect(() => {
    socket.connect();
    function onConnect() {

      if (isAuth) {
     
        socket.emit("web-connect", { userId });
      }
    }

    function onDisconnect() {}
    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return children;
}

export default SocketConnectionLayout;
