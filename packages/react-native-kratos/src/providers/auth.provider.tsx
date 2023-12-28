import type { Session }      from '@monstrs/react-kratos'
import type { ReactElement } from 'react'
import type { ReactNode }    from 'react'

import { useSdk }            from '@monstrs/react-kratos'
import AsyncStore            from '@react-native-async-storage/async-storage'
import * as SecureStore      from 'expo-secure-store'
import { Platform }          from 'react-native'
import { createContext }     from 'react'
import { useMemo }           from 'react'
import { useEffect }         from 'react'
import { useState }          from 'react'
import React                 from 'react'

const USER_SESSION_NAME = 'user_session'

export type SessionContext =
  | {
      sessionToken?: string
      session: Session
    }
  | undefined

export interface ContextAuth {
  session?: Session
  sessionToken?: string
  isAuthenticated: boolean
  setSession: (session: SessionContext) => void
}

export const AuthContext = createContext<ContextAuth>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSession: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement | null => {
  const [sessionContext, setSessionContext] = useState<SessionContext | undefined>(undefined)
  const [initialized, setInitialized] = useState<boolean>(false)
  const sdk = useSdk()

  const value = useMemo(
    () => ({
      session: sessionContext?.session,
      sessionToken: sessionContext?.sessionToken,
      isAuthenticated: Boolean(sessionContext?.sessionToken),
      setSession: async (session: SessionContext): Promise<void> => {
        if (Platform.OS !== 'web') {
          await SecureStore.setItemAsync(USER_SESSION_NAME, JSON.stringify(session))
        } else {
          await AsyncStore.setItem(USER_SESSION_NAME, JSON.stringify(session))
        }
      },
    }),
    [sessionContext]
  )

  useEffect(() => {
    const getAuthenticatedSession = async (): Promise<void> => {
      const userSession =
        Platform.OS !== 'web'
          ? await SecureStore.getItemAsync(USER_SESSION_NAME)
          : await AsyncStore.getItem(USER_SESSION_NAME)

      const auth: SessionContext = userSession ? JSON.parse(userSession) : undefined

      if (auth?.sessionToken) {
        try {
          const { data: session } = await sdk.toSession({ xSessionToken: auth.sessionToken })

          setSessionContext({ session, sessionToken: auth.sessionToken })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)

          setSessionContext(undefined)
        }
      }

      setInitialized(true)
    }

    getAuthenticatedSession()
  }, [sdk])

  if (!initialized) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
