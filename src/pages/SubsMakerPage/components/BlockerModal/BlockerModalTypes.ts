import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface IBlockerModalProps {
  isChanged: boolean
  setChanged: Dispatch<SetStateAction<boolean>>
  setCurrentQtyState: Dispatch<SetStateAction<number | null>>
  setSubsState: Dispatch<SetStateAction<ISubsState>>
}
