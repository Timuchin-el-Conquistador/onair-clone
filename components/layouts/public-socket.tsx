


'use client'


import {socket} from '@/utils/socket'

import { useEffect } from 'react';

function PublicSocketsLayout(){

    useEffect(() => {
        socket.connect();
        function onConnect() {
          console.log("connected");
        }
    
        function onDisconnect() {}
        socket.on("connect", onConnect);
    
        socket.on("disconnect", onDisconnect);
    
        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
        };
      }, [socket]);


    return(
        <></>
    )
}



export default PublicSocketsLayout