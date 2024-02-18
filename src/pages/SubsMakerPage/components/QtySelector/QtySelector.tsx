import React from 'react'
import { useTranslation } from 'react-i18next'

import { Select } from 'antd'

import { PATH } from '@components/Router/RouterConstants'

import './QtySelectorStyles.scss'
import { IQtySelectorProps } from './QtySelectorTypes'

const QtySelector: React.FC<IQtySelectorProps> = ({
  nav,
  subsState,
  setSubsState,
  setChanged,
}) => {
  const { t } = useTranslation()

  const { qty, subs } = subsState

  if (nav === PATH.subsMakerPlace) {
    return
  }

  const options = Array.from({ length: 150 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }))

  options.push({ value: 999, label: t('SubsMakerPage.NoLimits') })

  const handleSelectQty = (value: number[]) => {
    const sortFoo = (num1: number, num2: number) => {
      if (num1 > num2) return 1
      else return -1
    }

    const newSubs = subs.map((sub) => ({
      ...sub,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pricesPerQty: value.sort(sortFoo).reduce((obj: any, i) => {
        obj[i] = sub.pricesPerQty && sub.pricesPerQty[i]
        return obj
      }, {}),
    }))

    setSubsState({ ...subsState, qty: value.sort(sortFoo), subs: newSubs })
    setChanged(true)
  }

  const titleSelector = () => {
    switch (nav) {
      case PATH.subsMakerService:
        return t('SubsMakerPage.EmpCount')
      case PATH.subsMakerRental:
        return t('SubsMakerPage.StuffCount')
      case PATH.subsMakerHotel:
        return t('SubsMakerPage.RoomsCount')
      default:
        return t('SubsMakerPage.SeatsCount')
    }
  }

  return (
    <div className="QtySelector-body">
      <p>{titleSelector()}</p>
      <Select
        className="QtySelector-body-counter"
        mode="multiple"
        options={options}
        value={qty}
        onChange={handleSelectQty}
        placeholder={t('SubsMakerPage.EmpCountPlaceholder')}
      />
    </div>
  )
}

export default QtySelector
