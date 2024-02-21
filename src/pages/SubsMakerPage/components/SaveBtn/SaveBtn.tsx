import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Button, message } from 'antd'
import { IconDeviceFloppy } from '@tabler/icons-react'

import { SUB_TYPE } from '../../SubsMakerPageConstants'

import './SaveBtnStyles.scss'
import { ISaveBtnProps } from './SaveBtnTypes'

const SaveBtn: React.FC<ISaveBtnProps> = ({ isChanged, subsState }) => {
  const { t } = useTranslation()
  const params = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const { subs } = subsState

  const handleSave = () => {
    const langCheck = subs.some((sub) =>
      Object.values(sub.subInfo).some(
        ({ subDesc, subName }) => !subDesc || !subName,
      ),
    )

    const pricesCheck =
      params.id !== SUB_TYPE.place &&
      subs.some(
        ({ pricesPerQty }) =>
          pricesPerQty && Object.values(pricesPerQty).some((price) => !price),
      )

    if (!subs.length) {
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
