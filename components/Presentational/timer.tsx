import { useEffect, useState } from "react";

import { formatMMSSTime } from "@/utils/timer";

export default function Timer() {
  const [time, setTime] = useState(0); // time in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);




  return(
    <div className="mt-2 text-sm text-gray-500">Waiting since  {formatMMSSTime(time)}</div>
  )
}
