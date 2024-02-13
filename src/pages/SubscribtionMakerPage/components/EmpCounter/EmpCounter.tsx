import React from 'react'
import { useTranslation } from 'react-i18next'

import { Select } from 'antd'

import './EmpCounterStyles.scss'
import { IEmpCounterProps } from './EmpCounterTypes'

const EmpCounter: React.FC<IEmpCounterProps> = ({
  empCounterState,
  setEmpCounterState,
}) => {
  const { t } = useTranslation()

  const options = Array.from({ length: 20 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }))

  options.push({ value: 999, label: t('SubscribtionMakerPage.NoLimits') })

  const handleSelectEmp = (value: number[]) => {
    const sortFoo = (num1: number, num2: number) => {
      if (num1 > num2) return 1
      else return -1
    }

    setEmpCounterState(value.sort(sortFoo))
  }

  return (
    <div className="EmpCounter-body">
      <p className="EmpCounter-body-title">
        {t('SubscribtionMakerPage.EmpCount')}
      </p>
      <Select
        className="EmpCounter-body-counter"
        mode="multiple"
        options={options}
        value={empCounterState}
        onChange={handleSelectEmp}
        placeholder={t('SubscribtionMakerPage.EmpCountPlaceholder')}
      />
    </div>
  )
}

export default EmpCounter
