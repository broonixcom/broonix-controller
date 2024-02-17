import { Dispatch, SetStateAction } from 'react'

import { ISub } from '../../SubsMakerPageTypes'

export interface ILangTabsProps {
  subs: ISub[]
  supportedLang: string[]
  currentLangState: string
  setCurrentLangState: Dispatch<SetStateAction<string>>
}
