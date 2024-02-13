import { Dispatch, SetStateAction } from 'react'

export interface ILangSupportProps {
  supportedLang?: string[]
  setSupportedLang: Dispatch<SetStateAction<string[] | undefined>>
}
