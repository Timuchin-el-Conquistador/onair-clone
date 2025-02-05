import { useReducer } from "react";

import { type Link } from "@/lib/types/links";


type State = {
  link: Link;
  message: null | string;
  status: "waiting" | "live" | "declined" | null;

};

type Action = { type: "ONLINE" } | { type: "OFFLINE" };

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ONLINE":
      return {
        ...state,
        link: {
          ...state.link,
          availability: "online",
        },
      };

    case "OFFLINE":
      return {
        ...state,
        link: {
          ...state.link,
          availability: "offline",
        },
      };

    default:
      return { ...state };
  }
};

const useSession = (initialLink: Omit<Link, "timeLength">) => {
  const [session, setForm] = useReducer(formReducer, {
    link: initialLink,
    message: null,
    status: null,

  });

  const goOnline = () => {
    setForm({ type: "ONLINE" });
  };

  const goOffline = () => {
    setForm({ type: "OFFLINE" });
  };

  return {
    session,
    goOnline,
    goOffline,
  };
};

export default useSession;



