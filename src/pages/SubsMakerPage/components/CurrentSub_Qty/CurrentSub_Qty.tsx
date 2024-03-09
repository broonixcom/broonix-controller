import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Input, Form } from 'antd'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'

import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSub_QtyStyles.scss'

const CurrentSub_Qty: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [subs] = useAtom(subsAtom)

  if (!id) return

  if (id === SUB_TYPE.place) {
    return
  }

  return (
    <div className="CurrentSub_Qty-body">
      <p>{t('SubsMakerPage.PricePerQty')}</p>
      {subs[id].qty?.map((num: number) => (
        <Form.Item
          noStyle
          key={'PRICE_PER_EMP' + num}
          name={num.toString()}
          rules={[
            { required: true, message: t('SubsMakerPage.AddNewSubError') },
          ]}
        >
          <Input
            className="CurrentSub_Qty-body-input"
            type="number"
            addonBefore={num}
          />
        </Form.Item>
      ))}
    </div>
  )
}

export default CurrentSub_Qty
