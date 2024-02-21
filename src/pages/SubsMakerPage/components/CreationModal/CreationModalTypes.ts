import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface ICreationModalProps {
  subsState: ISubsState
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  setChanged: Dispatch<SetStateAction<boolean>>
  subForEdit?: number
  setSubForEdit: Dispatch<SetStateAction<number | undefined>>
  isCreateModalOpened: boolean
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>
  isCreateModalRendered: boolean
  setCreateModalRender: Dispatch<SetStateAction<boolean>>
}
