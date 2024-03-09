import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Divider, Input, Form } from 'antd'

import {
  SUB_TYPE,
  SUB_FIELD,
} from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSub_BasePriceStyles.scss'

const CurrentSub_BasePrice: React.FC = () => {
  const { t } = useTranslation()
  const params = useParams()

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
      {params.id === SUB_TYPE.place && (
        <>
          <p>{t('SubsMakerPage.PricePerMonth')}</p>
          <Form.Item
            noStyle
            name={SUB_FIELD.pricePerMonth}
            rules={[
              {
                required: params.id === SUB_TYPE.place,
                message: t('SubsMakerPage.AddNewSubError'),
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </>
      )}
      <Divider />
    </div>
  )
}

export default CurrentSub_BasePrice
