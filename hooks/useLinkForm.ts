import { useReducer } from "react";

import { type Link } from "@/lib/types/links";

import { socket } from "@/socket";

import { useEffect } from "react";


type State = {
  link: Link;
  message: null | string;
  status: "pending" | "fulfilled" | "error" | null;
  slugStatus: "pending" | "fulfilled" | "taken" | null;
};

type Action =
  | { type: "SLUG"; payload: string }
  | { type: "NAME"; payload: string }
  | { type: "REMOVE_INTEGRATION"; payload: string }
  | { type: "AVAILABILITY"; payload: string }
  | { type: "SLUGSTATUSCHANGE"; payload: "pending" | "fulfilled" | "taken" }
  | {
      type: "VISITORFORMCOLLECTING";
      payload: { type: "push" | "pull"; value: "email" | "phone" };
    };

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

    case "NAME":
      return {
        ...state,
        link: {
          ...state.link,
          linkName: action.payload,
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

    case "SLUGSTATUSCHANGE":
      return {
        ...state,
        slugStatus: action.payload,
      };

    case "VISITORFORMCOLLECTING":
      return {
        ...state,
        link: {
          ...state.link,
          settings: {
            ...state.link.settings,
            visitorForm:
              action.payload.type == "push"
                ? [...state.link.settings.visitorForm, action.payload.value]
                : state.link.settings.visitorForm.filter(
                    (el) => el != action.payload.value
                  ),
          },
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
    setForm({ type: "SLUGSTATUSCHANGE", payload: "pending" });
    setForm({ type: "SLUG", payload: slug });
  };

  const handleLinkNameChange = (linkName: string) => {
    setForm({ type: "NAME", payload: linkName });
  };

  const removeIntegration = (integrationId: string) => {
    setForm({ type: "REMOVE_INTEGRATION", payload: integrationId });
  };

  const changeAvailability = (availability: string) => {
    setForm({ type: "AVAILABILITY", payload: availability });
  };

  const visitingFormCollectionStrategyChange= (type: "push" | "pull", value: "email" | "phone") => {
    setForm({ type: "VISITORFORMCOLLECTING", payload: { type, value } });
  };

  useEffect(() => {
    socket.on("slug-validation-result", (response) => {
      console.log("Received from server:", response);

      setForm({
        type: "SLUGSTATUSCHANGE",
        payload: response.slugIsTaken ? "taken" : "fulfilled",
      });
    });
  }, [socket]);

  return {
    form,
    handleSlugChange,
    handleLinkNameChange,
    removeIntegration,
    changeAvailability,
    visitingFormCollectionStrategyChange,
  };
};

export default useLinkForm;
