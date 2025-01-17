import { useReducer } from "react";

import { type Link } from "@/lib/types/links";

import { socket } from "@/utils/socket";

import { useEffect } from "react";


type State = {
  link: Link;
  message: null | string;
  status: "pending" | "fulfilled" | "error" | null;
  slugStatus: "pending" | "fulfilled" | "taken" | null;
};

type Action =
  | { type: "ONLINE" }
  | { type: "OFFLINE" }


const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ONLINE":
      return {
        ...state,
        link: {
          ...state.link,
         availability:'online'
        },
      };

    case "OFFLINE":
      return {
        ...state,
        link: {
          ...state.link,
      availability:'offline'
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
    slugStatus: null,
  });

  const goOnline = () => {
alert('online')
    setForm({ type: "ONLINE" });
  };

  const goOffline = () => {
    alert('offline')
    setForm({ type: "OFFLINE" });
  };





  return {
    session,
    goOnline,
    goOffline,

  };
};

export default useSession;
