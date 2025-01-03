import { useReducer } from "react";

import { type Link } from "@/lib/types/links";

type State = {
  link: Omit<Link, "timeLength">;
  message: null | string;
  status: "pending" | "fulfilled" | "error" | null;
  slugStatus: "pending" | "fulfilled" | "error" | null;
};

type Action =
  | { type: "SLUG"; payload: string }
  | { type: "NAME"; payload: string }
  | { type: "REMOVE_INTEGRATION"; payload: string }
  | { type: "AVAILABILITY"; payload: string };

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SLUG":
      return {
        ...state,
        link: {
          ...state.link,
          slug: action.payload,
        },
      };

    case "REMOVE_INTEGRATION":
      return {
        ...state,
        link: {
          ...state.link,
          integrations: state.link.integrations.filter(
            (el) => el._id !== action.payload
          ),
        },
      };
    case "AVAILABILITY":

      return {
        ...state,
        link: {
          ...state.link,
          availability: action.payload,
        },
      };

    default:
      return { ...state };
  }
};

const useLinkForm = (initialLink: Omit<Link, "timeLength">) => {
  const [form, setForm] = useReducer(formReducer, {
    link: initialLink,
    message: null,
    status: null,
    slugStatus: null,
  });

  const handleSlugChange = (slug: string) => {
    setForm({ type: "SLUG", payload: slug });
  };

  const removeIntegration = (integrationId: string) => {
    setForm({ type: "REMOVE_INTEGRATION", payload: integrationId });
  };

  const changeAvailability = (availability: string) => {
    setForm({ type: "AVAILABILITY", payload: availability });
  };


  return {
    form,
    handleSlugChange,
    removeIntegration,
    changeAvailability
  };
};

export default useLinkForm;
