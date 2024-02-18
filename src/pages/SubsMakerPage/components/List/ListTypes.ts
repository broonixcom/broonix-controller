import { Dispatch, SetStateAction } from 'react'

import { ISubsState } from '../../SubsMakerPageTypes'

export interface IListProps {
  subsState: ISubsState
  setSubsState: Dispatch<SetStateAction<ISubsState>>
  currentQtyState: number | null
  currentLangState: string
  isAlarm: boolean
  setChanged: Dispatch<SetStateAction<boolean>>
  setSubForEdit: Dispatch<SetStateAction<number | undefined>>
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>
  setCreateModalRender: Dispatch<SetStateAction<boolean>>
  nav: string
}
