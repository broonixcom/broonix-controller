import { Dispatch, SetStateAction } from 'react'

import { ISub } from '../../SubsMakerPageTypes'

export interface ICreationModal_QtyProps {
  qty: number[]
  localSub: ISub
  setLocalSub: Dispatch<SetStateAction<ISub>>
  setLocalChanged: Dispatch<SetStateAction<boolean>>
}
