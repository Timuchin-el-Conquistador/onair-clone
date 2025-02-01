import { createStore } from "zustand/vanilla";

import { fakeBackend } from "@/lib/axios";

import { verifySession } from "@/lib/dal";

import { type NewUser, type User } from "@/lib/types/user";

import { createSession } from "@/lib/session";
import { Plan } from "@/lib/types/billing";

const path = "/api/v1/user";

export type UserState = {
  loading: boolean;
  error: Error | null;
  user: User | null;
  message: string | null;
  resetPasswordToken: string | null;
  token: string | null;
  peerId: string | null;
  subscription: Plan | null;
};

export type UserActions = {
  //auth
  signup: (user: NewUser, router: any) => void;
  resendEmailConfirmationToken:(email: string, router: any) => void;
  login: (user: { email: string; password: string }, router: any) => void;
  forgotPassword: (email: string, router: any) => void;
  submitOTP: (otp: string, router: any) => void;
  resendToEmailOTP: () => void;
  resetPassword: (
    newPassword: string | null,
    confirmPassword: string | null,
    router: any
  ) => void;
  //private
  //getAccountInformation: () => void;
 // setCurrentSubscription: (plan: Plan) => void;
  /* editProfilePicture: (file: File, router: any) => void;
  editProfile: (user: {
    fullName: string;
    phoneNumber: string;
    password: string | null;
  }) => void;*/

  reset: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  subscription: null,
  resetPasswordToken: null,
  token: null,
  peerId: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set, getState) => ({
    ...initState,
    signup: async (user, router) => {
      if (user.password != user.confirmPassword) {
        return set((prevState) => ({
          ...prevState,
          error: new Error("Şifrə və şifrə təsdiqi eyni olmalıdır."),
        }));
      }

      if (user.password == null) {
        return set((prevState) => ({
          ...prevState,
          error: new Error("Yeni şifrə yaradılmayıb."),
        }));
      }
      if (user.confirmPassword == null) {
        return set((prevState) => ({
          ...prevState,
          error: new Error("Şifrə və təsdiq şifrəsi uyğun deyil."),
        }));
      }
      set((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
        message: null,
      }));
      try {
        await fakeBackend.post(path + "/signup", {
          email: user.email,
          fullName: user.fullName,
          password: user.password,
        });
        // await createSession(response.response._id, response.response.email);


        set((prevState) => ({
          ...prevState,
          loading: false,
          message: "Success",
        }));

        router.push('/users')
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },

    resendEmailConfirmationToken: async (email:string,router:any) => {
      try {
        set((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          message: null,
        }));
        const path = `api/v1/user/resend-confirmation`;
        const response: { message: string } = await fakeBackend.post(path, {
          email,
        });

        set((prevState) => ({
          ...prevState,
          loading: false,
          message: response.message,
          //  token:response.token
        }));
        router.push('/users')
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    login: async (user, router) => {
      set((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
        message: null,
      }));
      try {
        const response: { message: string; user: User } =
          await fakeBackend.post(path + "/signin", { ...user, role: "web" });

        await createSession({
          id: response.user.id,
          email: response.user.email,
          fullName: response.user.fullName,
          accountStatus:response.user.accountStatus
        });

        set((prevState) => ({
          ...prevState,
          loading: false,
          user: response.user,
        }));
        router.replace("/dashboard");
      } catch (error) {
   
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },

    forgotPassword: async (email, router) => {
      try {
        set((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          message: null,
        }));
        const path = `api/v1/test-app/user/forgot-password`;
        const response: { message: string } = await fakeBackend.post(path, {
          email,
        });

        set((prevState) => ({
          ...prevState,
          loading: false,
          message: response.message,
          //  token:response.token
        }));
        sessionStorage.setItem("email", email);
        setTimeout(() => {
          router.replace("/otp");
        }, 700);
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
    submitOTP: async (otp, router) => {
      sessionStorage.removeItem("email");
      try {
        set((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          message: null,
        }));
        const path = `api/v1/test-app/user/confirm-otp`;
        const response: { message: string; token: string } =
          await fakeBackend.post(path, { OTP: otp });
 
        set((prevState) => ({
          ...prevState,
          loading: false,
          message: response.message,
          token: response.token,
        }));

        sessionStorage.setItem("reset-passord-token", response.token);
        setTimeout(() => {
          router.replace("/reset-password");
        }, 700);
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },

    resendToEmailOTP: async () => {
      const email = sessionStorage.getItem("email") || "";

      try {
        set((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          message: null,
        }));
        const path = `api/v1/test-app/user/forgot-password`;
        const response: { message: string } = await fakeBackend.post(path, {
          email,
        });

        set((prevState) => ({
          ...prevState,
          loading: false,
          message: response.message,
          //  token:response.token
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },

    resetPassword: async (password, confirmPassword, router) => {
      try {
        if (password != confirmPassword) {
          return set((prevState) => ({
            ...prevState,
            error: new Error("Şifrə və şifrə təsdiqi eyni olmalıdır."),
          }));
        }

        if (password == null) {
          return set((prevState) => ({
            ...prevState,
            error: new Error("Yeni şifrə yaradılmayıb."),
          }));
        }
        if (confirmPassword == null) {
          return set((prevState) => ({
            ...prevState,
            error: new Error("Şifrə və təsdiq şifrəsi uyğun deyil."),
          }));
        }
        set((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          message: null,
        }));
        const token = sessionStorage.getItem("reset-passord-token");
        sessionStorage.removeItem("reset-passord-token");

        const path = `api/v1/test-app/user/reset-password`;
        const response: { message: string } = await fakeBackend.post(
          path + "/" + token,
          {
            password,
          }
        );

        set((prevState) => ({
          ...prevState,
          loading: false,
          message: response.message,
        }));
        setTimeout(() => {
          router.replace("/reset-password-success");
        }, 700);
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },
   /* getAccountInformation: async () => {
      try {
        const session = await verifySession();
        if (!session) return null;
        set((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          message: null,
        }));
        const path = `api/v1/user/${session?.email}`;
        const response: { user: User } = await fakeBackend.get(path);

        set((prevState) => ({
          ...prevState,
          loading: false,
          user: response.user,
        }));
      } catch (error) {
        set((prevState) => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    },*/
    /*setCurrentSubscription: (plan: Plan) => {
      set((prevState) => ({
        ...prevState,
        subscription: plan,
      }));
    },*/
    reset: () => {
      set((prevState) => ({
        ...prevState,
        error: null,
        message: null,
      }));
    },
  }));
};
