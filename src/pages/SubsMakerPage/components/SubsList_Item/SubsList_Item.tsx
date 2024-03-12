import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Card, Divider } from 'antd'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import alarmAtom from '@atoms/subsMakerAtoms/alarmAtom'
import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'
import { ISub } from '@atoms/subsMakerAtoms/subsAtom/subsAtomTypes'

import SubsList_List_Btns from '../SubsList_List_Btns'

import './SubsList_ItemStyles.scss'
import { ISubsList_ItemProps } from './SubsList_ItemTypes'

const SubsList_Item: React.FC<ISubsList_ItemProps> = ({
  sub,
  index,
  selectedLang,
  selectedQty,
}) => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [subs] = useAtom(subsAtom)
  const [langSupport] = useAtom(langSupportAtom)
  const [isAlarm, setAlarm] = useAtom(alarmAtom)

  useEffect(() => {
    if (!langSupport?.length) return

    const subLangKeys = sub.subInfo ? Object.keys(sub.subInfo) : []
    const checkLang = langSupport.every((lang) => subLangKeys.includes(lang))
    const checkLangCount = langSupport.length === subLangKeys.length

    const subQtyKeys = sub.pricesPerQty
      ? Object.keys(sub.pricesPerQty).map(Number)
      : []
    const checkQty =
      id && subs[id].qty?.every((qty) => subQtyKeys.includes(qty))
    const checkQtyCount = id && subs[id].qty?.length === subQtyKeys.length

    checkLang && checkLangCount && checkQty && checkQtyCount
      ? setAlarm(false)
      : setAlarm(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subs, langSupport, id])

  if (!id || !selectedLang || !selectedQty) {
    return
  }

  const pricePerMonth = (sub: ISub) => {
    if (id === SUB_TYPE.place) {
      return `$${sub.pricePerMonth}`
    } else {
      return `$${sub.pricesPerQty?.[selectedQty]}`
    }
  }

  const noDiscountPrice = (subMonths?: number) => {
    const baseSub = subs[id].subs.find((sub) => sub.base)

    if (
      id === SUB_TYPE.place &&
      baseSub &&
      baseSub.pricePerMonth &&
      subMonths
    ) {
      return `$${(subMonths * baseSub.pricePerMonth).toFixed(2)}`
    }
    if (baseSub && baseSub.pricesPerQty && subMonths) {
      return `$${(subMonths * baseSub.pricesPerQty[selectedQty]).toFixed(2)}`
    }
  }

  const totalPrice = ({
    pricePerMonth,
    subMonths,
    pricesPerQty,
    subInfo,
  }: ISub) => {
    if (id === SUB_TYPE.place && pricePerMonth && subMonths) {
      return `$${pricePerMonth * subMonths}`
    }
    if (pricesPerQty && subMonths && subInfo) {
      return `$${(pricesPerQty[selectedQty] * subMonths).toFixed(2)} ${subInfo[selectedLang]?.subTotalTxt}`
    }
  }

  return (
    <Card
      key={'SUB' + index}
      className={clsx({
        ['SubsList_Item-body']: true,
        ['SubsList_Item-body-subAlarm']: isAlarm,
        ['SubsList_Item-body-subFocused']: sub.focus,
      })}
    >
      <p className="SubsList_Item-body-name">
        {sub.subInfo?.[selectedLang]?.subNameTxt}
      </p>
      <p className="SubsList_Item-body-desc">
        {sub.subInfo?.[selectedLang]?.subDescTxt}
      </p>
      <Divider />
      <p className="SubsList_Item-body-perMonth">
        {pricePerMonth(sub)}
        <span>{t('SubsMakerPage.PerMonth')}</span>
      </p>
      <p className="SubsList_Item-body-totalNoDiscount">
        {!sub.base && noDiscountPrice(sub.subMonths)}
      </p>
      <p className="SubsList_Item-body-total">{totalPrice(sub)}</p>
      <SubsList_List_Btns {...{ index, sub }} />
    </Card>
  )
}

export default SubsList_Item
