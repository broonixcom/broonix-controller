import { Dispatch, SetStateAction } from 'react'

import { ISubsState, ISub } from '../../SubsMakerPageTypes'

export interface IList_BtnContainerProps {
  subsState: ISubsState
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  currentSub: ISub
  i: number
  setChanged: Dispatch<SetStateAction<boolean>>
  setSubForEdit: Dispatch<SetStateAction<number | undefined>>
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>
  setCreateModalRender: Dispatch<SetStateAction<boolean>>
}
