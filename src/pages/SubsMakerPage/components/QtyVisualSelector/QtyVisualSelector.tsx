import React from 'react'
import { useTranslation } from 'react-i18next'

import { Radio, RadioChangeEvent, Select } from 'antd'

import { PATH } from '@components/Router/RouterConstants'

import './QtyVisualSelectorStyles.scss'
import { IQtyVisualSelectorProps } from './QtyVisualSelectorTypes'

const QtyVisualSelector: React.FC<IQtyVisualSelectorProps> = ({
  qty,
  subs,
  nav,
  currentQtyState,
  setCurrentQtyState,
}) => {
  const { t } = useTranslation()

  if (nav === PATH.subsMakerPlace) {
    return
  }

  const handleChangeRadio = ({ target: { value } }: RadioChangeEvent) => {
    setCurrentQtyState(value)
  }

  const handleChangeSelect = (value: number) => {
    setCurrentQtyState(value)
  }

  const options = qty.map((q: number, i: number) => {
    if (i === 0)
      return {
        label: `${t('Prepositions.Before')} ${q}`,
        value: q,
      }
    if (q === 999) return { label: t('SubsMakerPage.NoLimits'), value: q }
    else {
      return { label: q, value: q }
    }
  })

  if (!qty.length || !subs.length) {
    return
  }

  return (
    <div className="QtyVisualSelector-body">
      <Radio.Group
        className="QtyVisualSelector-body-radio"
        options={options}
        onChange={handleChangeRadio}
        value={currentQtyState ?? qty[0]}
        optionType="button"
        buttonStyle="solid"
      />
      <Select
        className="QtyVisualSelector-body-selector"
        value={currentQtyState ?? qty[0]}
        options={options}
        onChange={handleChangeSelect}
        placeholder={t('SubsMakerPage.VisualSelectorPlaceholder')}
      />
    </div>
  )
}

export default QtyVisualSelector
