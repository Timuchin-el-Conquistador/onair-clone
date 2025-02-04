import { verifySession } from "@/lib/dal";
import { Call } from "@/lib/types/call";
import { createStore } from "zustand/vanilla";
import { fakeBackend } from "@/lib/axios";

export type SessionState = {
  sessions: Call[];
  joinSession: string | null;
  loaded: boolean;
  error: Error | null;
  success: string | null;
};

export type SessionActions = {
  retrieveActiveSessions: (slug: string, router: any) => void;
  pushNotification: (session: Call, router: any) => void;
  pullSession: (sessionId: string) => void;
  removeInactiveCall: (callId: string, router: any) => void;
  reset: () => void;
};

export type SessionStore = SessionState & SessionActions;

const defaultInitState: SessionState = {
  sessions: [],
  joinSession: null,
  loaded: false,
  error: null,
  success: null,
};

let path = "/api/v1/user";

export const createSessionStore = (
  initState: SessionState = defaultInitState
) => {
  return createStore<SessionStore>()((set) => ({
    ...initState,
    retrieveActiveSessions: async (slug: string, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        path += `/${session.email}/urls/${slug}/calls/active-sessions`;

        const response: { sessions: Call[]; message: string } =
          await fakeBackend.get(path);
        set((prevState) => ({
          ...prevState,
          loaded: true,
          sessions: response.sessions,
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
    pushNotification: async (activeSession: Call, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

        set((prevState) => ({
          ...prevState,
          sessions: [...prevState.sessions, activeSession],
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    pullSession: (sessionId: string) => {
      try {
        set((prevState) => ({
          ...prevState,
          sessions: prevState.sessions.filter((el) => el._id != sessionId),
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
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");
        path += `/${session.email}/calls/${callId}`;

        const response: { message: string } = await fakeBackend.delete(path);

        router.back();
        set((prevState) => ({
          ...prevState,
          success: response.message,
          sessions: prevState.sessions.filter((el) => el._id != callId),
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
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
  }));
};
