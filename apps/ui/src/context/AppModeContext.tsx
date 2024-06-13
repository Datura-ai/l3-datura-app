import { createContext, useContext, useState } from 'react'

import type { ReactNode } from 'react'

type AppModeContextType = {
  mode: Option
  setMode: (mode: Option) => void
  computeMode: boolean
  subnetMode: boolean
  options: Option[]
}

export type Option = {
  type: string
  name: string
  icon: string
}

const MODE_OPTIONS = [
  {
    type: 'compute',
    name: 'Compute',
    icon: 'https://cdn-icons-png.freepik.com/512/929/929574.png',
  },
  {
    type: 'subnet_api',
    name: 'Subnet API',
    icon: 'https://cdn-icons-png.flaticon.com/512/319/319559.png',
  },
]

export const AppModeContext = createContext<AppModeContextType | null>(null)

type AppModeContextProviderProps = {
  children: ReactNode
}

export function AppModeContextProvider({ children }: AppModeContextProviderProps): JSX.Element {
  const [mode, setMode] = useState<Option>(() => {
    const savedMode = localStorage.getItem('appModeStorage')
    return savedMode ? JSON.parse(savedMode) : MODE_OPTIONS[0]
  })

  const computeMode = mode.type === 'compute'
  const subnetMode = mode.type === 'subnet_api'

  const saveModeToLocal = (newMode: Option) => {
    localStorage.setItem('appModeStorage', JSON.stringify(newMode))
    setMode(newMode)
  }

  const value: AppModeContextType = {
    mode,
    setMode: saveModeToLocal,
    computeMode,
    subnetMode,
    options: MODE_OPTIONS,
  }

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
}

export function useAppModeContext(): AppModeContextType {
  const context = useContext(AppModeContext)

  if (!context) throw new Error('useAppModeContext must be used within an AppModeContextProvider')

  return context
}
