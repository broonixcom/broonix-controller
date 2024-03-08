import { ISub } from '@atoms/subsMakerAtoms/subsAtom/subsAtomTypes'

export interface ISubsList_ItemProps {
  sub: ISub
  index: number
  selectedLang?: string
  selectedQty?: number
}
