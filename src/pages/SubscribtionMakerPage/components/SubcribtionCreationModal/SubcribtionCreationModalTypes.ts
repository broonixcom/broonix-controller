import { Dispatch, SetStateAction } from 'react'

import { ISubState } from '../../SubscribtionMakerPageTypes'

export interface ISubcribtionCreationModalProps {
  empCounterState?: number[]
  subs?: ISubState
  setSubs: Dispatch<SetStateAction<ISubState | undefined>>
}
