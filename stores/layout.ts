import { createStore } from "zustand/vanilla";

export type LayoutState = {
  splashScreen: boolean;
  selectedSidebarPage: string;
};

export type LayoutActions = {
  splashScreenOff: () => void;
  selectActiveSidebarPage: (page: string) => void;
  // splashScreenOn: () => void;
};

export type LayoutStore = LayoutState & LayoutActions;



const defaultInitState: LayoutState = {
  splashScreen: true,
  selectedSidebarPage:  '',
};



export const createLayoutStore = (
  initState: LayoutState = defaultInitState
) => {
  return createStore<LayoutStore>()((set) => ({
    ...initState,
    splashScreenOff: () => {
      set((state) => ({ ...state, splashScreen: false }));
    },
    selectActiveSidebarPage: (page) => {
      set((state) => ({ ...state, selectedSidebarPage: page }));
    },
    //splashScreenOn: () => set((state) => ({ splashScreen: true })),
  }));
};
