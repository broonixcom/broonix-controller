import React, { useState, useEffect } from 'react'

import { Devider, Divider } from 'antd'

import EmpCounter from './components/EmpCounter'
import LangSupport from './components/LangSupport'
import SubcribtionCreationModal from './components/SubcribtionCreationModal'

import './SubscribtionMakerPageStyles.scss'
import { ISubState } from './SubscribtionMakerPageTypes'

const SubscribtionMakerPage: React.FC = () => {
  const [empCounterState, setEmpCounterState] = useState<number[] | undefined>([
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 999,
  ])
  const [supportedLang, setSupportedLang] = useState(['RU', 'UZ', 'EN'])
  const [subs, setSubs] = useState<ISubState>({
    subName: '',
    subDesc: '',
    subMonths: 1,
    subNoDiscount: 9.99,
    pricesPerEmp: [{ value: 1, price: 9.99 }],
  })

  useEffect(() => {
    console.log(subs)
  }, [subs])

  return (
    <div className="SubscribtionMakerPage-body">
      <EmpCounter
        empCounterState={empCounterState}
        setEmpCounterState={setEmpCounterState}
      />
      <Divider />
      <LangSupport
        supportedLang={supportedLang}
        setSupportedLang={setSupportedLang}
      />
      <Divider />
      <SubcribtionCreationModal
        empCounterState={empCounterState}
        subs={subs}
        setSubs={setSubs}
      />
    </div>
  )
}

export default SubscribtionMakerPage
