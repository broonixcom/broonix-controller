import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { message } from 'antd'

import langSupportAtom from '@atoms/langSupportAtom'
import useGetLang from '@api/useGetLang'
import useUpdateLang from '@api/useUpdateLang'
import { RES_CODE } from '@api/apiConstants'

import LangSupportUI from './LangSupportUI'

import './LangSupportStyles.scss'

const LangSupport: React.FC = () => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()

  const [lang, setLang] = useAtom(langSupportAtom)

  const { getLang, getLangIsLoading, langData } = useGetLang()
  const { updateLang, updateLangIsLoading, updateLangStatus } = useUpdateLang()

  const [isAddNewLangOpen, setAddNewLangOpen] = useState(false)
  const [isDeleteLangOpen, setDeleteLangOpen] = useState(false)
  const [newLangInput, setNewLangInput] = useState('')
  const [langForDelete, setLangForDelete] = useState('')
  const [newLangArr, setNewLangArr] = useState([] as string[])

  useEffect(() => {
    !lang.length && getLang()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !!langData && setLang(langData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langData])

  useEffect(() => {
    if (updateLangStatus === RES_CODE.ok) {
      setLang(newLangArr)
      setAddNewLangOpen(false)
      setDeleteLangOpen(false)
      setNewLangInput('')
      setLangForDelete('')
      setNewLangArr([])
      messageApi.success(t('Message.Updated'))
    }
    if (updateLangStatus === RES_CODE.error) {
      messageApi.error(t('Message.Error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLangStatus])

  const handleOpenAddLang = () => {
    setAddNewLangOpen(true)
  }

  const handleCloseAddLang = () => {
    setAddNewLangOpen(false)
    setNewLangInput('')
  }

  const handleChangeInputLang = (e: any) => {
    e.target.value.length >= 3
      ? messageApi.error(t('SettingsPage.AddLangErrorLetterCount'))
      : setNewLangInput(e.target.value.toUpperCase())
  }

  const handleAddLang = () => {
    const regex = /^[a-zA-Z]*$/

    if (newLangInput && !regex.test(newLangInput)) {
      return messageApi.error(t('SettingsPage.AddLangErrorLatin'))
    }
    if (lang.find((existedLang) => existedLang === newLangInput)) {
      return messageApi.error(t('SettingsPage.AddLangErrorSame'))
    }
    updateLang([...lang, newLangInput])
    setNewLangArr([...lang, newLangInput])
  }

  const handleOpenDeleteLang = (selectedLang: string) => {
    setDeleteLangOpen(true)
    setLangForDelete(selectedLang)
  }

  const handleClosDeleteLang = () => {
    setDeleteLangOpen(false)
  }

  const handleDeleteLang = () => {
    const preparedLangArr = lang.filter(
      (langItem) => langItem !== langForDelete,
    )
    updateLang(preparedLangArr)
    setNewLangArr(preparedLangArr)
  }

  return (
    <LangSupportUI
      {...{
        contextHolder,
        isAddNewLangOpen,
        newLangInput,
        isDeleteLangOpen,
        getLangIsLoading,
        updateLangIsLoading,
        handleOpenAddLang,
        handleChangeInputLang,
        handleCloseAddLang,
        handleAddLang,
        handleOpenDeleteLang,
        handleClosDeleteLang,
        handleDeleteLang,
      }}
    />
  )
}

export default LangSupport
