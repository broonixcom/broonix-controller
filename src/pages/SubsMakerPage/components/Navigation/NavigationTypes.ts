import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface INavigationProps {
  isChanged: boolean
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  setChanged: Dispatch<SetStateAction<boolean>>
  setCurrentQtyState: Dispatch<SetStateAction<number | null>>
  setItNew: Dispatch<SetStateAction<boolean>>
}
