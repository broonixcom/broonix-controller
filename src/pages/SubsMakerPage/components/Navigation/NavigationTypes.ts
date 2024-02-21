import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface INavigationProps {
  initialSubState: ISubsState
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  setChanged: Dispatch<SetStateAction<boolean>>
  setCurrentQtyState: Dispatch<SetStateAction<number | null>>
}
