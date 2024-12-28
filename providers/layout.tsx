'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type LayoutStore, createLayoutStore } from '@/stores/layout'

export type LayoutStoreApi = ReturnType<typeof createLayoutStore>

export const LayoutStoreContext = createContext<LayoutStoreApi | undefined>(
  undefined,
)

export interface LayoutStoreProviderProps {
  children: ReactNode
}

export const LayoutStoreProvider = ({
  children,
}: LayoutStoreProviderProps) => {
  const storeRef = useRef<LayoutStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createLayoutStore()
  }

  return (
    <LayoutStoreContext.Provider value={storeRef.current}>
      {children}
    </LayoutStoreContext.Provider>
  )
}

export const useLayoutStore = <T,>(
  selector: (store: LayoutStore) => T,
): T => {
  const layoutStoreContext = useContext(LayoutStoreContext)

  if (!layoutStoreContext) {
    throw new Error(`useLayoutStore must be used within LayoutStoreProvider`)
  }

  return useStore(layoutStoreContext, selector)
}