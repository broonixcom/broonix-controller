import { Dispatch, SetStateAction } from 'react'

import { ISub } from '../../SubsMakerPageTypes'

export interface IQtyVisualSelectorProps {
  qty: number[]
  subs: ISub[]
  currentQtyState: number | null
  setCurrentQtyState: Dispatch<SetStateAction<number | null>>
}
