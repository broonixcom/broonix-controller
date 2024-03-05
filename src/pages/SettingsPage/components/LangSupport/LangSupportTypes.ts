import { ReactElement, JSXElementConstructor } from 'react'
import { MessageType } from 'antd/es/message/interface'

export interface ILangSupportUIProps {
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>
  isAddNewLangOpen: boolean
  newLangInput: string
  isDeleteLangOpen: boolean
  getLangIsLoading: boolean
  updateLangIsLoading: boolean
  handleOpenAddLang: () => void
  handleChangeInputLang: (e: any) => void
  handleCloseAddLang: () => void
  handleAddLang: () => MessageType | undefined
  handleOpenDeleteLang: (selectedLang: string) => void
  handleClosDeleteLang: () => void
  handleDeleteLang: () => void
}
