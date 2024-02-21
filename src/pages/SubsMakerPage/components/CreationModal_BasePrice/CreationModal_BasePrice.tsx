import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Divider, Input } from 'antd'

import { SUB_TYPE } from '../../SubsMakerPageConstants'

import './CreationModal_BasePriceStyles.scss'
import { ICreationModal_BasePriceProps } from './CreationModal_BasePriceTypes'

const CreationModal_BasePrice: React.FC<ICreationModal_BasePriceProps> = ({
  localSub,
  setLocalSub,
  setLocalChanged,
}) => {
  const { t } = useTranslation()
  const params = useParams()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBasePrice = (e: any) => {
    setLocalChanged(true)

    const field = e.target.getAttribute('name')
    const value = e.target.value

    setLocalSub({ ...localSub, [field]: Number(value) })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePricePerMonth = (e: any) => {
    setLocalChanged(true)

    const field = e.target.getAttribute('name')
    const value = e.target.value

    setLocalSub({ ...localSub, [field]: Number(value) })
  }

  return (
    <div className="CreationModal_BasePrice-body">
      <Divider />
      <p>{t('SubsMakerPage.SubcriptionMonths')}</p>
      <Input
        className="CreationModal_BasePrice-body-marginBottom"
        type="number"
        name="subMonths"
        onChange={handleBasePrice}
        value={localSub.subMonths}
      />
      {params.id === SUB_TYPE.place && (
        <>
          <p>{t('SubsMakerPage.PricePerMonth')}</p>
          <Input
            className="CreationModal_BasePrice-body-marginBottom"
            type="number"
            name="pricePerMonth"
            onChange={handlePricePerMonth}
            value={localSub.pricePerMonth}
          />
        </>
      )}
    </div>
  )
}

export default CreationModal_BasePrice
