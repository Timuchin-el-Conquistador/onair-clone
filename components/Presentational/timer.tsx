import { useEffect, useRef, useState } from "react";

import { formatMMSSTime } from "@/utils/timer";

export default function Timer(props: { sendAsMissedCall: () => void }) {
  const [time, setTime] = useState(0); // time in seconds


  const countRef = useRef(time); // Store latest state
  
  useEffect(() => {
    countRef.current = time; // Update ref whenever state updates
  }, [time]);

  useEffect(() => {
    const interval = setInterval(function(){

      if (countRef.current >= 10) {
        props.sendAsMissedCall();
        return clearInterval(interval);
      }
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="mt-2 text-sm text-gray-500">
      Waiting since {formatMMSSTime(time)}
    </div>
  );
}
