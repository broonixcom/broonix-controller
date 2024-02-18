import React from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Card, Divider } from 'antd'

import { PATH } from '@components/Router/RouterConstants'

import List_BtnContainer from '../List_BtnContainer'
import { ISub } from '../../SubsMakerPageTypes'

import './ListStyles.scss'
import { IListProps } from './ListTypes'

const List: React.FC<IListProps> = ({
  subsState,
  setSubsState,
  currentQtyState,
  currentLangState,
  isAlarm,
  setChanged,
  setSubForEdit,
  setCreateModalOpen,
  setCreateModalRender,
  nav,
}) => {
  const { t } = useTranslation()

  const { qty, subs } = subsState

  if (!subs.length) {
    return
  }

  const pricePerMonth = (sub: ISub) => {
    if (nav === PATH.subsMakerPlace) {
      return `$${sub.pricePerMonth}`
    } else {
      return `$${sub.pricesPerQty?.[currentQtyState ?? qty[0]]}`
    }
  }

  const noDiscountPrice = (subMonths: number) => {
    const baseSub = subs.find((sub) => sub.base)

    if (nav === PATH.subsMakerPlace && baseSub && baseSub.pricePerMonth) {
      return `$${(subMonths * baseSub.pricePerMonth).toFixed(2)}`
    }
    if (baseSub) {
      return (
        currentQtyState &&
        baseSub.pricesPerQty &&
        `$${(subMonths * baseSub.pricesPerQty[currentQtyState]).toFixed(2)}`
      )
    } else {
      return
    }
  }

  const totalPrice = ({
    pricePerMonth,
    subMonths,
    pricesPerQty,
    subInfo,
  }: ISub) => {
    if (nav === PATH.subsMakerPlace && pricePerMonth) {
      return `$${pricePerMonth * subMonths}`
    }
    if (pricesPerQty) {
      return `$${(pricesPerQty?.[currentQtyState ?? qty[0]] * subMonths).toFixed(2)} ${subInfo[currentLangState].subTotal}`
    }
  }

  return (
    <div className="List-body">
      {subs.map((sub, i) => (
        <Card
          key={'SUB' + i}
          className={clsx({
            ['List-body-sub']: true,
            ['List-body-subAlarm']: isAlarm,
          })}
        >
          <p className="List-body-sub-name">
            {sub.subInfo[currentLangState]?.subName}
          </p>
          <p className="List-body-sub-desc">
            {sub.subInfo[currentLangState]?.subDesc}
          </p>
          <Divider />
          <p className="List-body-sub-perMonth">
            {pricePerMonth(sub)}
            <span>{t('SubsMakerPage.PerMonth')}</span>
          </p>
          <p className="List-body-sub-totalNoDiscount">
            {!sub.base && noDiscountPrice(sub.subMonths)}
          </p>
          <p className="List-body-sub-total">{totalPrice(sub)}</p>
          <List_BtnContainer
            {...{
              subsState,
              setSubsState,
              i,
              setChanged,
              setSubForEdit,
              setCreateModalOpen,
              setCreateModalRender,
              currentSub: sub,
            }}
          />
        </Card>
      ))}
    </div>
  )
}

export default List
