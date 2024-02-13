import { Dispatch, SetStateAction } from 'react'

export interface IEmpCounterProps {
  empCounterState?: number[]
  setEmpCounterState: Dispatch<SetStateAction<undefined | number[]>>
}
