import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { Button, Input, message } from 'antd'
import { IconPlaylistAdd } from '@tabler/icons-react'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import useUpdateLang from '@api/subsMakerApi/useUpdateLang'
import { RES_CODE } from '@api/apiConstants'

import ModalX from '@components/ModalX'

import './LangSupport_AddLangStyles.scss'

const LangSupport_AddLang: React.FC = () => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()

  const { updateLang, updateLangIsLoading, updateLangStatus } = useUpdateLang()

  const [langSupport] = useAtom(langSupportAtom)

  const [isAddNewLangModalOpen, setAddNewLangModalOpen] = useState(false)
  const [newLangInput, setNewLangInput] = useState('')

  useEffect(() => {
    if (updateLangStatus === RES_CODE.ok) {
      setAddNewLangModalOpen(false)
      setNewLangInput('')
      messageApi.success(t('Message.Saved'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLangStatus])

  const handleChangeInputLang = (e: any) => {
    e.target.value.length >= 3
      ? messageApi.error(t('SubsMakerPage.AddLangErrorLetterCount'))
      : setNewLangInput(e.target.value.toUpperCase())
  }

  const handleCloseModal = () => {
    setAddNewLangModalOpen(false)
    setNewLangInput('')
  }

  const handleAddLang = () => {
    const regex = /^[a-zA-Z]*$/

    if (newLangInput && !regex.test(newLangInput)) {
      return messageApi.error(t('SubsMakerPage.AddLangErrorLatin'))
    }
    if (langSupport.find((existedLang) => existedLang === newLangInput)) {
      return messageApi.error(t('SubsMakerPage.AddLangErrorSame'))
    }
    updateLang([...langSupport, newLangInput])
  }

  return (
    <div className="LangSupport_AddLang-body">
      {contextHolder}
      <Button
        className="LangSupport_AddLang-body-addBtn"
        onClick={() => setAddNewLangModalOpen(true)}
        icon={<IconPlaylistAdd />}
      >
        {t('Button.Add')}
      </Button>
      <ModalX
        title={t('SubsMakerPage.AddLang')}
        open={isAddNewLangModalOpen}
        onOk={handleAddLang}
        okText={t('Button.Add')}
        okButtonProps={{
          loading: updateLangIsLoading,
          disabled: updateLangIsLoading,
        }}
        onCancel={handleCloseModal}
        cancelText={t('Button.Cancel')}
        cancelButtonProps={{ disabled: updateLangIsLoading }}
      >
        <Input
          onChange={handleChangeInputLang}
          value={newLangInput}
          className="LangSupport_AddLang-body-modalInput"
          placeholder={t('SubsMakerPage.AddLangPlaceholder')}
        />
      </ModalX>
    </div>
  )
}

export default LangSupport_AddLang
