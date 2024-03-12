import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Button, message } from 'antd'
import { IconDeviceFloppy } from '@tabler/icons-react'

import alarmAtom from '@atoms/subsMakerAtoms/alarmAtom'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'

import useUpdateSubs from '@api/subsMakerApi/useUpdateSubs'
import isEqual from '@helpers/isEqual'
import { RES_CODE } from '@api/apiConstants'

import './SaveBtnStyles.scss'

const SaveBtn: React.FC = () => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()

  const [subs] = useAtom(subsAtom)
  const [isAlarm] = useAtom(alarmAtom)

  const { updateSubs, updateSubsIsLoading, updateSubsStatus } = useUpdateSubs()

  useEffect(() => {
    if (updateSubsStatus === RES_CODE.ok) {
      messageApi.success(t('Message.Updated'))
    }
    if (updateSubsStatus === RES_CODE.error) {
      messageApi.error(t('Message.Error'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSubsStatus])

  if (!id) return

  const handleSave = async () => {
    if (isAlarm) {
      return messageApi.error(t('SubsMakerPage.ErrorPutSomeChanges'))
    }
    if (isEqual(subs[id], subs.original)) {
      return messageApi.warning(t('SubsMakerPage.WarnNoChanges'))
    }

    updateSubs(subs[id])
  }

  return (
    <>
      {contextHolder}
      <Button
        className="SaveBtn-body"
        type="primary"
        icon={<IconDeviceFloppy />}
        disabled={updateSubsIsLoading}
        onClick={handleSave}
        loading={updateSubsIsLoading}
      >
        {t('Button.Save')}
      </Button>
    </>
  )
}

export default SaveBtn
