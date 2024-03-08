import { Dispatch, SetStateAction } from 'react'

export interface ISubsList_LangTabsProps {
  selectedLang?: string
  setSelectedLang: Dispatch<SetStateAction<string | undefined>>
}
