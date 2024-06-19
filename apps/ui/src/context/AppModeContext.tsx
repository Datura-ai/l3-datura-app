import { createContext, useContext, useEffect, useState } from 'react'

import type { ReactNode } from 'react'
import { useGetAccounts } from 'services/Account/useAccountService'
import { setAccountId, removeAccountId } from 'helpers/authHelper'

type AppModeContextType = {
  mode: Option
  setMode: (mode: Option) => void
  computeMode: boolean
  subnetMode: boolean
  accounts: Option[]
}

export type Option = {
  type: string
  name: string
  id?: string
  icon?: string
}

export const account_mode_icon: Record<string, string> = {
  'compute': 'https://cdn-icons-png.freepik.com/512/929/929574.png',
  'subnet_api': 'https://cdn-icons-png.flaticon.com/512/319/319559.png',
}

export const AppModeContext = createContext<AppModeContextType | null>(null)

type AppModeContextProviderProps = {
  children: ReactNode
}

export function AppModeContextProvider({ children }: AppModeContextProviderProps): JSX.Element {
  const { data: accounts } = useGetAccounts()

  const [mode, setMode] = useState<Option>(() => {
    const savedMode = localStorage.getItem('appModeStorage')
    return savedMode ? JSON.parse(savedMode) : null
  })

  useEffect(() => {
    if (accounts && accounts.length > 0 && !mode) {
      const newMode = {
        type: accounts[0].configs?.account_type ?? 'compute',
        name: accounts[0].name,
        id: accounts[0].id,
      }
      setMode(newMode)
      localStorage.setItem('appModeStorage', JSON.stringify(newMode))
      // setAccountId(newMode.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts])

  const computeMode = mode?.type === 'compute'
  const subnetMode = mode?.type === 'subnet_api'

  const saveModeToLocal = (newMode: Option) => {
    localStorage.setItem('appModeStorage', JSON.stringify(newMode))
    setMode(newMode)
    // setAccountId(newMode.id)
  }

  const accountOptions = accounts.map((account: any) => ({ 
    type: account.configs?.account_type ?? 'compute', 
    name: account.name, 
    id: account.id 
  }))

  const value: AppModeContextType = {
    mode,
    setMode: saveModeToLocal,
    computeMode,
    subnetMode,
    accounts: accountOptions
  }

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
}

export function useAppModeContext(): AppModeContextType {
  const context = useContext(AppModeContext)

  if (!context) throw new Error('useAppModeContext must be used within an AppModeContextProvider')

  return context
}
