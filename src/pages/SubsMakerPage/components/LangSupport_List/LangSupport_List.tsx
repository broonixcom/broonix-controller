import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Popover, Button, message } from 'antd'
import { IconTrash } from '@tabler/icons-react'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import ModalX from '@components/ModalX'
import useUpdateLang from '@api/subsMakerApi/useUpdateLang'
import { RES_CODE } from '@api/apiConstants'

import './LangSupport_ListStyles.scss'

const LangSupport_List: React.FC = () => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()

  const [langSupport] = useAtom(langSupportAtom)

  const { updateLang, updateLangIsLoading, updateLangStatus } = useUpdateLang()

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [langForDelete, setLangForDelete] = useState('')

  useEffect(() => {
    if (updateLangStatus === RES_CODE.ok) {
      setDeleteModalOpen(false)
      setLangForDelete('')
      messageApi.success(t('Message.Deleted'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLangStatus])

  const handleOpenDeleteLang = (selectedLang: string) => {
    setDeleteModalOpen(true)
    setLangForDelete(selectedLang)
  }

  const handleClosDeleteLang = () => {
    setDeleteModalOpen(false)
    setLangForDelete('')
  }

  const handleDeleteLang = () => {
    const preparedLangArr = langSupport.filter(
      (langItem) => langItem !== langForDelete,
    )
    updateLang(preparedLangArr)
  }

  return (
    <div className="LangSupport_List-body">
      {contextHolder}
      {langSupport?.map((langItem, i) => (
        <Popover
          key={'LANG' + i}
          placement="bottom"
          open={langSupport.length <= 1 ? false : undefined}
          content={
            <Button
              type="text"
              icon={<IconTrash />}
              className="LangSupport_List-body-deleteBtn"
              onClick={() => handleOpenDeleteLang(langItem)}
              name={langItem}
            />
          }
        >
          <Button
            className="LangSupport_List-body-btn"
            disabled={langSupport.length === 1}
          >
            {langItem}
          </Button>
        </Popover>
      ))}
      <ModalX
        className="LangSupport_List-body-deleteModal"
        title={t('SubsMakerPage.DeleteLangModalTitle')}
        open={isDeleteModalOpen}
        onOk={handleDeleteLang}
        okButtonProps={{
          loading: updateLangIsLoading,
          disabled: updateLangIsLoading,
        }}
        okText={t('Button.Yes')}
        onCancel={handleClosDeleteLang}
        cancelText={t('Button.No')}
        cancelButtonProps={{ disabled: updateLangIsLoading }}
      />
    </div>
  )
}

export default LangSupport_List
