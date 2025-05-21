import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  profile: any;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
};

export const userAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: null,
      setToken: (token: string) =>
        set((_state) => ({
          token,
        })),
      setProfile: (profile: any) =>
        set((_state) => ({
          profile,
        })),
    }),
    { name: "auth" }
  )
);
