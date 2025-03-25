import type { GenericError }      from '@monstrs/react-kratos'
import type { ReactNode }         from 'react'
import type { ReactElement }      from 'react'

import { VerificationNativeFlow } from '@monstrs/react-kratos'
import React                      from 'react'

export interface ReactNativeVerificationFlowProps {
  children: ReactNode
  flowId?: string
  onError?: (error: unknown) => void
  onGenericError?: (error: GenericError) => void
}

export const ReactNativeVerificationFlow = ({
  children,
  flowId,
  onError,
  onGenericError,
}: ReactNativeVerificationFlowProps): ReactElement => (
  <VerificationNativeFlow flowId={flowId} onError={onError} onGenericError={onGenericError}>
    {children}
  </VerificationNativeFlow>
)
