import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Radio, RadioChangeEvent, Select } from 'antd'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'

import './SubsList_QtySelectorStyles.scss'
import { ISubsList_QtySelectorProps } from './SubsList_QtySelectorTypes'

const SubsList_QtySelector: React.FC<ISubsList_QtySelectorProps> = ({
  selectedQty,
  setSelecdtedQty,
}) => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [subs] = useAtom(subsAtom)

  useEffect(() => {
    id && setSelecdtedQty(subs[id].qty?.[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!id) {
    return
  }

  const handleChangeRadio = ({ target: { value } }: RadioChangeEvent) => {
    setSelecdtedQty(value)
  }

  const handleChangeSelect = (value: number) => {
    setSelecdtedQty(value)
  }

  const options = subs[id].qty?.map((q: number, i: number) => {
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

  return (
    <div className="SubsList_QtySelector-body">
      {options && (
        <Radio.Group
          className="SubsList_QtySelector-body-radio"
          options={options}
          onChange={handleChangeRadio}
          value={selectedQty}
          optionType="button"
          buttonStyle="solid"
        />
      )}
      {options && (
        <Select
          className="SubsList_QtySelector-body-selector"
          value={selectedQty}
          options={options}
          onChange={handleChangeSelect}
          placeholder={t('SubsMakerPage.VisualSelectorPlaceholder')}
        />
      )}
    </div>
  )
}

export default SubsList_QtySelector
