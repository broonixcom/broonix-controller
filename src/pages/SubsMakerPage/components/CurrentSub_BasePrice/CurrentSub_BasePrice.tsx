import React from 'react'
import { useTranslation } from 'react-i18next'

import { Divider, Input, Form } from 'antd'

import { SUB_FIELD } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSub_BasePriceStyles.scss'

const CurrentSub_BasePrice: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="CurrentSub_BasePrice-body">
      <p>{t('SubsMakerPage.SubcriptionMonths')}</p>
      <Form.Item
        noStyle
        name={SUB_FIELD.subMonths}
        rules={[{ required: true, message: t('SubsMakerPage.AddNewSubError') }]}
      >
        <Input type="number" />
      </Form.Item>
      <Divider />
    </div>
  )
}

export default CurrentSub_BasePrice
