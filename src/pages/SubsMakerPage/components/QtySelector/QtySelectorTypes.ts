import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface IQtySelectorProps {
  nav: string
  subsState: ISubsState
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  setChanged: Dispatch<SetStateAction<boolean>>
}
