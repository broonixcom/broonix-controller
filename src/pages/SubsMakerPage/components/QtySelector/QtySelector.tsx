import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Select, message } from 'antd'

import { SUB_TYPE } from '../../SubsMakerPageConstants'

import './QtySelectorStyles.scss'
import { IQtySelectorProps } from './QtySelectorTypes'

const QtySelector: React.FC<IQtySelectorProps> = ({
  subsState,
  setSubsState,
  setChanged,
}) => {
  const { t } = useTranslation()
  const params = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const { qty, subs } = subsState

  if (params.id === SUB_TYPE.place) {
    return
  }

  const options = Array.from({ length: 150 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }))

  options.push({ value: 999, label: t('SubsMakerPage.NoLimits') })

  const handleSelectQty = (value: number[]) => {
    if (value.length === 0) {
      return messageApi.error(t('SubsMakerPage.QtyError'))
    }

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
    switch (params.id) {
      case SUB_TYPE.service:
        return t('SubsMakerPage.EmpCount')
      case SUB_TYPE.rental:
        return t('SubsMakerPage.StuffCount')
      case SUB_TYPE.hotel:
        return t('SubsMakerPage.RoomsCount')
      default:
        return t('SubsMakerPage.SeatsCount')
    }
  }

  return (
    <div className="QtySelector-body">
      {contextHolder}
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
