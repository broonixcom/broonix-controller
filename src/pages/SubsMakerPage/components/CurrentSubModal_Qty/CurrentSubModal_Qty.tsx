import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Divider, Input } from 'antd'

import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'

import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSubModal_QtyStyles.scss'

const CurrentSubModal_Qty: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [currentSub, setCurrentSub] = useAtom(currentSubAtom)
  const [subs] = useAtom(subsAtom)

  if (!id) return

  if (id === SUB_TYPE.place) {
    return
  }

  const handlePricesPerQty = (e: any) => {
    const field = e.target.getAttribute('name')
    const value = e.target.value

    setCurrentSub({
      ...currentSub,
      sub: {
        ...currentSub.sub,
        pricesPerQty: {
          ...currentSub.sub?.pricesPerQty,
          [field]: Number(value),
        },
      },
    })
  }

  return (
    <div className="CurrentSubModal_Qty-body">
      <Divider />
      <p className="CurrentSubModal_Qty-body-marginBottom">
        {t('SubsMakerPage.PricePerQty')}
      </p>
      {subs[id].qty?.map((num: number) => (
        <Input
          key={'PRICE_PER_EMP' + num}
          className="CurrentSubModal_Qty-body-marginBottom"
          type="number"
          addonBefore={num}
          name={num.toString()}
          onChange={handlePricesPerQty}
          value={currentSub.sub?.pricesPerQty?.[num]}
        />
      ))}
    </div>
  )
}

export default CurrentSubModal_Qty
