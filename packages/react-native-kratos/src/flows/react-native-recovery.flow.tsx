import type { GenericError }  from '@monstrs/react-kratos'
import type { ReactNode }     from 'react'
import type { ReactElement }  from 'react'

import { RecoveryNativeFlow } from '@monstrs/react-kratos'
import React                  from 'react'

import { useAuth }            from '../hooks'

export interface ReactNativeRecoveryFlowProps {
  children: ReactNode
  onError?: (error: unknown) => void
  onGenericError?: (error: GenericError) => void
  onSubmitPassed: (flowId: string) => void
}

export const ReactNativeRecoveryFlow = ({
  children,
  onError,
  onGenericError,
  onSubmitPassed,
}: ReactNativeRecoveryFlowProps): ReactElement => {
  const { setSession } = useAuth()

  return (
    <RecoveryNativeFlow
      setSession={setSession}
      onSubmitPassed={onSubmitPassed}
      onError={onError}
      onGenericError={onGenericError}
    >
      {children}
    </RecoveryNativeFlow>
  )
}
