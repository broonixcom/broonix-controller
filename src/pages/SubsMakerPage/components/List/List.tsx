import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import { Card, Divider } from 'antd'

import './ListStyles.scss'
import { IListProps } from './ListTypes'

const List: React.FC<IListProps> = ({
  subsState,
  currentQtyState,
  currentLangState,
  isAlarm
}) => {
  const { qty, subs } = subsState

  if (!subs.length) {
    return
  }

  return (
    <div className="List-body">
      {subs.map((sub, i) => (
        <Card className={clsx({ ["List-body-sub"]: true, ["List-body-subAlarm"]: isAlarm })} key={'SUB' + i}>
          <p className="List-body-sub-name">
            {sub.subInfo[currentLangState]?.subName}
          </p>
          <p className="List-body-sub-desc">
            {sub.subInfo[currentLangState]?.subDesc}
          </p>
          <Divider />
          <p className="List-body-sub-perMonth">
            ${sub.pricesPerQty?.[currentQtyState ?? qty[0]]}
          </p>
          <p className="List-body-sub-totalNoDiscount">
            ${sub.subMonths * sub.subNoDiscount} 
          </p>
          <p className="List-body-sub-total">
            ${sub.pricesPerQty?.[currentQtyState ?? qty[0]] * sub.subMonths}
          </p>
        </Card>
      ))}
    </div>
  )
}

export default List
