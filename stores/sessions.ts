import { verifySession } from "@/lib/dal";
import { Session } from "@/lib/types/call";
import { createStore } from "zustand/vanilla";
import { fakeBackend } from "@/lib/axios";

export type SessionState = {
  sessions: Session[];
  joinSession: string | null;
  loaded: boolean;
  error: Error | null;
  message: string | null;
};

export type SessionActions = {
  retrieveActiveSessions: (slug: string, router: any) => void;
  pushSession: (session: Session, router:any) => void;
  removeSession: (callId: string) => void;
};

export type SessionStore = SessionState & SessionActions;

const defaultInitState: SessionState = {
  sessions: [],
  joinSession: null,
  loaded: false,
  error: null,
  message: null,
};

export const createSessionStore = (
  initState: SessionState = defaultInitState
) => {
  return createStore<SessionStore>()((set) => ({
    ...initState,
    retrieveActiveSessions: async (slug: string, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");

    

        const path = `api/v1/user/${session.email}/urls/${slug}/calls/sessions`;

        const response: { sessions: Session[]; message: string } =
          await fakeBackend.get(path);
        set((prevState) => ({
          ...prevState,
          loaded: true,
          sessions: response.sessions,
          message: response.message,
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loaded: true,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    pushSession:  async (activeSession: Session, router) => {
      try {
        const session = await verifySession();

        if (!session) return router.replace("/users/sign_in");


        set((prevState) => ({
          ...prevState,
          loaded: false,
          sessions: [...prevState.sessions, activeSession]
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loaded: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    removeSession: (callId: string) => {
      try {
        set((prevState) => ({
          ...prevState,
          sessions: prevState.sessions.filter((el) => el._id != callId)
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
  }));
};
