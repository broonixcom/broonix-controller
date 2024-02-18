import { Dispatch, SetStateAction } from 'react'

import { ISub } from '../../SubsMakerPageTypes'

export interface IQtyVisualSelectorProps {
  qty: number[]
  subs: ISub[]
  nav: string
  currentQtyState: number | null
  setCurrentQtyState: Dispatch<SetStateAction<number | null>>
}
