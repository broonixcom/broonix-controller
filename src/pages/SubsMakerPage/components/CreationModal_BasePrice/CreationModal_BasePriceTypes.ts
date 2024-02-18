import { Dispatch, SetStateAction } from 'react'

import { ISub } from '../../SubsMakerPageTypes'

export interface ICreationModal_BasePriceProps {
  localSub: ISub
  setLocalSub: Dispatch<SetStateAction<ISub>>
  setLocalChanged: Dispatch<SetStateAction<boolean>>
  nav: string
}
