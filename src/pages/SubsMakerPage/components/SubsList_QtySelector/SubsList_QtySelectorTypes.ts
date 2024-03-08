import { Dispatch, SetStateAction } from 'react'

export interface ISubsList_QtySelectorProps {
  selectedQty?: number
  setSelecdtedQty: Dispatch<SetStateAction<number | undefined>>
}
