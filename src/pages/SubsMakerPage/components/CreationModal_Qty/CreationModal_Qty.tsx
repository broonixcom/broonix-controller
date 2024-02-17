import React from 'react'
import { useTranslation } from 'react-i18next'

import { Divider, Input } from 'antd'

import { PATH } from '@components/Router/RouterConstants'

import './CreationModal_QtyStyles.scss'
import { ICreationModal_QtyProps } from './CreationModal_QtyTypes'

const CreationModal_Qty: React.FC<ICreationModal_QtyProps> = ({
  nav,
  qty,
  localSub,
  setLocalSub,
  setLocalChanged,
}) => {
  const { t } = useTranslation()

  if (nav === PATH.subsMakerPlace) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePricesPerQty = (e: any) => {
    setLocalChanged(true)

    const field = e.target.getAttribute('name')
    const value = e.target.value

    setLocalSub({
      ...localSub,
      pricesPerQty: {
        ...localSub.pricesPerQty,
        [field]: Number(value),
      },
    })
  }

  return (
    <div className="CreationModal_Qty-body">
      <Divider />
      <p className="CreationModal_Qty-body-marginBottom">
        {t('SubsMakerPage.PricePerQty')}
      </p>
      {qty.map((number) => (
        <Input
          key={'PRICE_PER_EMP' + number}
          className="CreationModal_Qty-body-marginBottom"
          type="number"
          addonBefore={number}
          name={number.toString()}
          onChange={handlePricesPerQty}
          value={localSub.pricesPerQty?.[number]}
        />
      ))}
    </div>
  )
}

export default CreationModal_Qty
