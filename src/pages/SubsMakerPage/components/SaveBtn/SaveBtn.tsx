import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, message } from 'antd'
import { IconDeviceFloppy } from '@tabler/icons-react'

import { PATH } from '@components/Router/RouterConstants'

import './SaveBtnStyles.scss'
import { ISaveBtnProps } from './SaveBtnTypes'

const SaveBtn: React.FC<ISaveBtnProps> = ({ isChanged, nav, subsState }) => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()

  const { subs } = subsState

  const handleSave = () => {
    const langCheck = subs.some((sub) =>
      Object.values(sub.subInfo).some(
        ({ subDesc, subName }) => !subDesc || !subName,
      ),
    )

    const pricesCheck =
      nav !== PATH.subsMakerPlace &&
      subs.some(
        ({ pricesPerQty }) =>
          pricesPerQty && Object.values(pricesPerQty).some((price) => !price),
      )

    if(!subs.length){
      return messageApi.warning(t('SubsMakerPage.SavedWarningNoSubs'))
    } 
    if (langCheck || pricesCheck) {
      return messageApi.error(t('SubsMakerPage.SavedNotEnoughInfo'))
    }

    messageApi.success(t('SubsMakerPage.SavedSuccess'))
  }

  return (
    <>
      {contextHolder}
      <Button
        className="SaveBtn-body"
        type="primary"
        icon={<IconDeviceFloppy />}
        disabled={!isChanged}
        onClick={handleSave}
      >
        {t('Button.Save')}
      </Button>
    </>
  )
}

export default SaveBtn
