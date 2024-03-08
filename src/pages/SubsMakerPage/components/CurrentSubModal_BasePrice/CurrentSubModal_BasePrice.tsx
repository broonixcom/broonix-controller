import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Divider, Input } from 'antd'

import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'
import {
  SUB_TYPE,
  SUB_FIELD,
} from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSubModal_BasePriceStyles.scss'

const CurrentSubModal_BasePrice: React.FC = () => {
  const { t } = useTranslation()
  const params = useParams()

  const [currentSub, setCurrentSub] = useAtom(currentSubAtom)

  const handleValue = (e: any) => {
    const value = e.target.value
    const field = e.target.getAttribute('name')

    setCurrentSub({
      ...currentSub,
      sub: {
        ...currentSub.sub,
        [field]: Number(value),
      },
    })
  }

  return (
    <div className="CurrentSubModal_BasePrice-body">
      <Divider />
      <p>{t('SubsMakerPage.SubcriptionMonths')}</p>
      <Input
        className="CurrentSubModal_BasePrice-body-marginBottom"
        type="number"
        name={SUB_FIELD.subMonths}
        onChange={handleValue}
        value={currentSub.sub?.subMonths}
      />
      {params.id === SUB_TYPE.place && (
        <>
          <p>{t('SubsMakerPage.PricePerMonth')}</p>
          <Input
            className="CurrentSubModal_BasePrice-body-marginBottom"
            type="number"
            name={SUB_FIELD.pricePerMonth}
            onChange={handleValue}
            value={currentSub.sub?.pricePerMonth}
          />
        </>
      )}
    </div>
  )
}

export default CurrentSubModal_BasePrice
