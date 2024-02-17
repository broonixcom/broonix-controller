import { ISubsState } from '../../SubsMakerPageTypes'

export interface IListProps {
  subsState: ISubsState
  currentQtyState: number | null
  currentLangState: string
  isAlarm: boolean
}
