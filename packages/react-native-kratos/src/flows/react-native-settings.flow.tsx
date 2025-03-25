import type { GenericError }  from '@monstrs/react-kratos'
import type { ReactNode }     from 'react'
import type { ReactElement }  from 'react'

import { SettingsNativeFlow } from '@monstrs/react-kratos'
import React                  from 'react'

import { useAuth }            from '../hooks'

export interface ReactNativeSettingsFlowProps {
  children: ReactNode
  flowId?: string
  onError?: (error: unknown) => void
  onGenericError?: (error: GenericError) => void
}

export const ReactNativeSettingsFlow = ({
  children,
  flowId,
  onError,
  onGenericError,
}: ReactNativeSettingsFlowProps): ReactElement => {
  const { sessionToken } = useAuth()

  return (
    <SettingsNativeFlow
      flowId={flowId}
      sessionToken={sessionToken}
      onError={onError}
      onGenericError={onGenericError}
    >
      {children}
    </SettingsNativeFlow>
  )
}
