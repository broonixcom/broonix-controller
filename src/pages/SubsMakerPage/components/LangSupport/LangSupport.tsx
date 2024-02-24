import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Popover, Modal, Input, message } from 'antd'
import { IconTrash, IconPlaylistAdd } from '@tabler/icons-react'

import './LangSupportStyles.scss'
import { ILangSupportProps } from './LangSupportTypes'

const LangSupport: React.FC<ILangSupportProps> = ({
  subsState,
  setSubsState,
  setChanged,
  setCurrentLangState,
}) => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()

  const { supportedLang, subs } = subsState

  const [isModalOpened, setModalOpen] = useState(false)
  const [isModalRendered, setModalRender] = useState(false)
  const [newLang, setNewLang] = useState('')

  const handleOpenModal = () => {
    setModalRender(true)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setNewLang('')
  }

  const handleAfterClose = () => {
    setModalRender(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeInputLang = (e: any) => {
    setNewLang(e.target.value.toUpperCase())
  }

  const handleAddLang = () => {
    const regex = /^[a-zA-Z]*$/

    if (newLang && !regex.test(newLang)) {
      return messageApi.error(t('SubsMakerPage.AddLangErrorLatin'))
    }
    if (supportedLang.find((lang) => lang === newLang)) {
      return messageApi.error(t('SubsMakerPage.AddLangErrorSame'))
    } else {
      const newSubs = subs.map((sub) => ({
        ...sub,
        subInfo: {
          ...sub.subInfo,
          [newLang]: {
            subName: undefined,
            subDesc: undefined,
          },
        },
      }))

      setSubsState({
        ...subsState,
        supportedLang: [...supportedLang, newLang],
        subs: newSubs,
      })
      setChanged(true)
      setModalOpen(false)
      setNewLang('')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteLang = (e: any) => {
    const selectedLang: string = e.currentTarget.getAttribute('name')

    const newSupportedLang = supportedLang?.filter(
      (lang) => lang !== selectedLang,
    )
    const newSubs = subs.map((sub) => {
      const newSubInfo = Object.assign({}, sub.subInfo)
      delete newSubInfo[selectedLang]
      return {
        ...sub,
        subInfo: newSubInfo,
      }
    })

    setChanged(true)
    setCurrentLangState(newSupportedLang[0])
    setSubsState({
      ...subsState,
      supportedLang: newSupportedLang,
      subs: newSubs,
    })
  }

  return (
    <div className="LangSupport-body">
      {contextHolder}
      <p>{t('SubsMakerPage.LangSupport')}</p>
      <Button
        className="LangSupport-body-addBtn"
        onClick={handleOpenModal}
        icon={<IconPlaylistAdd />}
      >
        {t('Button.Add')}
      </Button>
      <div className="LangSupport-body-langList">
        {supportedLang?.map((lang, i) => (
          <Popover
            key={'LANG' + i}
            placement="bottom"
            open={supportedLang.length <= 1 ? false : undefined}
            content={
              <Button
                type="text"
                icon={<IconTrash />}
                className="LangSupport-body-langList-deleteBtn"
                onClick={handleDeleteLang}
                name={lang}
              />
            }
          >
            <Button
              className="LangSupport-body-langList-btn"
              disabled={supportedLang.length === 1}
            >
              {lang}
            </Button>
          </Popover>
        ))}
      </div>
      {isModalRendered && (
        <Modal
          title={t('SubsMakerPage.AddLang')}
          open={isModalOpened}
          onOk={handleAddLang}
          okButtonProps={{ disabled: !newLang }}
          okText={t('Button.Add')}
          onCancel={handleCloseModal}
          afterClose={handleAfterClose}
          cancelText={t('Button.Cancel')}
        >
          <Input
            onChange={handleChangeInputLang}
            value={newLang}
            className="LangSupport-body-modalInput"
            placeholder={t('SubsMakerPage.AddLangPlaceholder')}
          />
        </Modal>
      )}
    </div>
  )
}

export default LangSupport
