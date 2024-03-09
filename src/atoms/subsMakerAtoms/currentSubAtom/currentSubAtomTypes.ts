import { ISub } from '../subsAtom/subsAtomTypes'

export interface ICurrentSubAtom {
  isModalOpen: boolean
  sub?: ISub
  index?: number
}
