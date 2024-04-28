import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Select, message, Divider } from 'antd'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './QtySelectorStyles.scss'

const QtySelector: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const [subs, setSubs] = useAtom(subsAtom)

  if (!id) return

  const options = Array.from({ length: 500 }, (_, index) => ({
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

    setSubs({
      ...subs,
      [id]: {
        ...subs[id],
        qty: value.sort(sortFoo),
      },
    })
  }

  const titleSelector = () => {
    switch (id) {
      case SUB_TYPE.service:
        return t('SubsMakerPage.EmpCount')
      case SUB_TYPE.rental:
        return t('SubsMakerPage.StuffCount')
      case SUB_TYPE.hotel:
        return t('SubsMakerPage.RoomsCount')
      case SUB_TYPE.place:
        return t('SubsMakerPage.PlacesCount')
      default:
        return t('SubsMakerPage.SeatsCount')
    }
  }

  return (
    <div className="QtySelector-body">
      <Divider />
      {contextHolder}
      <p>{titleSelector()}</p>
      <Select
        className="QtySelector-body-counter"
        mode="multiple"
        options={options}
        value={subs[id].qty || null}
        onChange={handleSelectQty}
        placeholder={t('SubsMakerPage.EmpCountPlaceholder')}
      />
    </div>
  )
}

export default QtySelector
