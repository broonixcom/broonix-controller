import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from 'antd'
import { IconDeviceFloppy } from '@tabler/icons-react'

import './SaveBtnStyles.scss'
import { ISaveBtnProps } from './SaveBtnTypes'

const SaveBtn: React.FC<ISaveBtnProps> = ({ isChanged }) => {
  const { t } = useTranslation()

  return (
    <Button
      className="SaveBtn-body"
      type="primary"
      icon={<IconDeviceFloppy />}
      disabled={!isChanged}
    >
      {t('Button.Save')}
    </Button>
  )
}

export default SaveBtn
