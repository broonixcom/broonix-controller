import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface ILangSupportProps {
  subsState: ISubsState
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  setChanged: Dispatch<SetStateAction<boolean>>
  setCurrentLangState: Dispatch<SetStateAction<string>>
}
