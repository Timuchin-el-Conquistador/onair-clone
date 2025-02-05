import { useReducer } from "react";

import { type Link } from "@/lib/types/links";

import { socket } from "@/utils/socket";

import { useEffect } from "react";
import { Device } from "@/lib/types/device";

type State = {
  link: Omit<Link, "integrations" | "owner" | "timeLength">;
  message: null | string;
  status: "loading" | "active" | "failed"|null ;
  slugStatus: "checking" | "active" | "taken";
};

type Action =
  | { type: "SLUG"; payload: string }
  | { type: "NAME"; payload: string }
  | { type: "REMOVE_DEVICE"; payload: string }
  | { type: "AVAILABILITY"; payload: string }
  | { type: "SLUGSTATUSCHANGE"; payload: "checking" | "active" | "taken" }
  | {
      type: "VISITORSFORMFIELDSCHANGE";
      payload: { checked: boolean; field: "email" | "phone" };
    }
  | {
      type: "CONNECT_DEVICE";
      payload: Device[];
    }
  | {
      type: "ONLINE_MESSAGE";
      payload: string;
    }
  | {
      type: "OFFLINE_MESSAGE";
      payload: string;
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

    case "REMOVE_DEVICE":
      return {
        ...state,
        link: {
          ...state.link,
          connectedDevices: state.link.connectedDevices.filter(
            (el) => el._id !== action.payload
          ),
        },
      };
    case "CONNECT_DEVICE":
      return {
        ...state,
        link: {
          ...state.link,
          connectedDevices: [...state.link.connectedDevices, ...action.payload],
          callStrategy: "call all devices at once",
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

    case "VISITORSFORMFIELDSCHANGE":
      return {
        ...state,
        link: {
          ...state.link,
          settings: {
            ...state.link.settings,
            visitorForm: !action.payload.checked
              ? state.link.settings.visitorForm.filter(
                  (el) => el != action.payload.field
                )
              : [...state.link.settings.visitorForm, action.payload.field],
          },
        },
      };

    case "ONLINE_MESSAGE":
      return {
        ...state,
        link: {
          ...state.link,
          settings: {
            ...state.link.settings,
            onlineMessage: action.payload,
          },
        },
      };
    case "OFFLINE_MESSAGE":
      return {
        ...state,
        link: {
          ...state.link,
          settings: {
            ...state.link.settings,
            offlineMessage: action.payload,
          },
        },
      };

    default:
      return { ...state };
  }
};

const useLinkForm = (
  initialLink: Omit<Link, "timeLength" | "owner" | "integrations">
) => {
  const [form, setForm] = useReducer(formReducer, {
    link: initialLink,
    message: null,
    status: null,
    slugStatus: 'active',
  });

  const handleSlugChange = (slug: string,) => {
    if ( form.link.slug == slug) {
      setForm({ type: "SLUGSTATUSCHANGE", payload: "active" });
    } else {
      setForm({ type: "SLUGSTATUSCHANGE", payload: "checking" });
    }
    setForm({ type: "SLUG", payload: slug });
  };

  const handleLinkNameChange = (linkName: string) => {
    setForm({ type: "NAME", payload: linkName });
  };

  const unlinkDeviceFromUrl = (deviceId: string) => {
    setForm({ type: "REMOVE_DEVICE", payload: deviceId });
  };
  const connectDevices = (devices: Device[]) => {
    setForm({ type: "CONNECT_DEVICE", payload: devices });
  };

  const changeAvailability = (availability: string) => {
    setForm({ type: "AVAILABILITY", payload: availability });
  };

  const visitorFormFieldsChange = (field: {
    checked: boolean;
    field: "email" | "phone";
  }) => {
    setForm({ type: "VISITORSFORMFIELDSCHANGE", payload: field });
  };

  const changeOnlineMessage = (value: string) => {
    setForm({ type: "ONLINE_MESSAGE", payload: value });
  };

  const changeOfflineMessage = (value: string) => {
    setForm({ type: "OFFLINE_MESSAGE", payload: value });
  };

  useEffect(() => {
    socket.on("slug-validation-result", (response) => {
      console.log("Received from server:", response);

      setForm({
        type: "SLUGSTATUSCHANGE",
        payload: response.slugIsTaken ? "taken" : "active",
      });
    });
  }, [socket]);

  return {
    form,
    handleSlugChange,
    handleLinkNameChange,
    unlinkDeviceFromUrl,
    connectDevices,
    changeAvailability,
    visitorFormFieldsChange,
    changeOnlineMessage,
    changeOfflineMessage,
  };
};

export default useLinkForm;
