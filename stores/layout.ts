import { createStore } from "zustand/vanilla";

export type LayoutState = {

  selectedSidebarPage: string;
};

export type LayoutActions = {
  selectActiveSidebarPage: (page: string) => void;
  // splashScreenOn: () => void;
};

export type LayoutStore = LayoutState & LayoutActions;



const defaultInitState: LayoutState = {
  selectedSidebarPage:  '',
};



export const createLayoutStore = (
  initState: LayoutState = defaultInitState
) => {
  return createStore<LayoutStore>()((set) => ({
    ...initState,
    selectActiveSidebarPage: (page) => {
      set((state) => ({ ...state, selectedSidebarPage: page }));
    },
    //splashScreenOn: () => set((state) => ({ splashScreen: true })),
  }));
};
