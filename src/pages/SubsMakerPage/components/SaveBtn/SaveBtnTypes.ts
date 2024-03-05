import { Dispatch, SetStateAction } from 'react'
import { ISubsState } from '../../SubsMakerPageTypes'

export interface ISaveBtnProps {
  isChanged: boolean
  setChanged: Dispatch<SetStateAction<boolean>>
  subsState: ISubsState
  isItNew: boolean
  setItNew: Dispatch<SetStateAction<boolean>>
}
