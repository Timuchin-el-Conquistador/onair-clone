import { verifySession } from "@/lib/dal";
import { Call } from "@/lib/types/call";
import { createStore } from "zustand/vanilla";
import { fakeBackend } from "@/lib/axios";

export type SessionState = {
  sessions: Call[];
  notifications: Call[];
  loaded: boolean;
  error: Error | null;
  success: string | null;
  filter: {
    slug: string;
    caller: string;
  };
};

export type SessionActions = {
  // retrieveActiveSessions: (slug: string, router: any) => void;
  retrieveSessions: (router: any) => void;
  pushNotification: (notification: Call, router: any) => void;
  pullNotification: (notifiationId: string, router: any) => void;
  pushSession: (call: Call, router: any) => void;
  joinSession: (callAnsweredBy:string,callId: string, router: any) => void;
  endSession: (callId: string, router: any) => void;
  declineSession: (callDeclinedBy:string,callId: string, router: any) => void;
  removeInactiveCall: (callId: string, router: any) => void; //delete call
  filterCalls: (slug: string, filterByCallerWord: string, router: any) => void;
  reset: () => void;
};

export type SessionStore = SessionState & SessionActions;

const defaultInitState: SessionState = {
  sessions: [],
  notifications: [],
  loaded: false,
  error: null,
  success: null,
  filter: {
    slug: "All Links",
    caller: "",
  },
};

export const createSessionStore = (
  initState: SessionState = defaultInitState
) => {
  return createStore<SessionStore>()((set, get) => ({
    ...initState,
    retrieveSessions: async (router) => {
      try {
        set((prevState) => ({
          ...prevState,
          loaded: false,
        }));
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        const path = `/api/v1/user/${session.email}/calls`;

        const response: { message: string; calls: Call[] } =
          await fakeBackend.get(path);

        set((prevState) => ({
          ...prevState,
          loaded: true,
          sessions: response.calls,
          success: response.message,
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loaded: true,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },

    pushNotification: async (notifiation, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        set((prevState) => ({
          ...prevState,
          notifications: [...prevState.notifications, notifiation],
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    pullNotification: async (notifiationId, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        set((prevState) => ({
          ...prevState,
          notifications: prevState.notifications.filter(
            (el) => el._id != notifiationId
          ),
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    pushSession: async (call, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        set((prevState) => ({
          ...prevState,
          sessions: [...prevState.sessions, call],
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    joinSession: async (callAnsweredBy,callId, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        set((prevState) => ({
          ...prevState,
          sessions:prevState.sessions.map((el) => {
            if(el._id == callId){
              return {
                ...el,
                callStatus:'live',
                callAnsweredBy
              }
            }
            return el
          }),
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    endSession: async (callId, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");
        set((prevState) => ({
          ...prevState,
          sessions:prevState.sessions.map((el) => {
            if(el._id == callId){
              return {
                ...el,
                callStatus:'ended'
              }
            }
            return el
          }),
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    declineSession: async (callDeclinedBy,callId, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");
        set((prevState) => ({
          ...prevState,
          sessions:prevState.sessions.map((el) => {
            if(el._id == callId){
              return {
                ...el,
                callStatus:'declined'
              }
            }
            return el
          }),
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    removeInactiveCall: async (callId: string, router) => {
      try {
        set((prevState) => ({
          ...prevState,
          loaded: false,
        }));

        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");
        const path = `/api/v1/user/${session.email}/calls/${callId}`;

        const response: { message: string } = await fakeBackend.delete(path);

        router.back();
        set((prevState) => ({
          ...prevState,
          loaded: true,
          success: response.message,
          sessions: prevState.sessions.filter((el) => el._id != callId),
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loaded: true,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    reset: () => {
      set((prevState) => ({
        ...prevState,
        error: null,
        success: null,
      }));
    },

    filterCalls: async (slug, filterByCaller, router) => {
      try {
        set((prevState) => ({
          ...prevState,
          loaded: false,
        }));

        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        let path = `/api/v1/user/${session.email}/calls/filter?caller=${filterByCaller}`;

        if (slug != "All Links") {
          path += `&slug=${slug}`;
        }
        const response: { message: string; calls: Call[] } =
          await fakeBackend.get(path);

        set((prevState) => ({
          ...prevState,
          loaded: true,
          sessions: response.calls,
          filter: {
            slug,
            caller: filterByCaller,
          },
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loaded: true,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
  }));
};
