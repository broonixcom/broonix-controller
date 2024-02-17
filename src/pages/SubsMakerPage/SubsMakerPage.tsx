import React, { useState, useEffect } from 'react'

import { PATH } from '@components/Router/RouterConstants'
import Loader from '@components/Loader'

import Navigation from './components/Navigation'
import SaveBtn from './components/SaveBtn'
import QtySelector from './components/QtySelector'
import LangSupport from './components/LangSupport'
import CreationModal from './components/CreationModal'
import LangTabs from './components/LangTabs'
import QtyVisualSelector from './components/QtyVisualSelector'
import List from './components/List'

import { INITIAL_STATE } from './SubsMakerPageConstants'

const SubsMakerPage: React.FC = () => {
  const [nav, setNav] = useState(PATH.subsMakerService)

  const [subsState, setSubsState] = useState(INITIAL_STATE)
  const [isChanged, setChanged] = useState(false)
  const [isAlarm, setAlarm] = useState(false)
  const [currentQtyState, setCurrentQtyState] = useState<number | null>(null)
  const [currentLangState, setCurrentLangState] = useState(
    subsState.supportedLang[0],
  )

  useEffect(() => {
    for (const sub of subsState.subs) {
      const subInfoCheck = Object.values(sub.subInfo).some((val) => val.subDesc === undefined || val.subName === undefined)
      const pricesCheck = Object.values(sub.pricesPerQty).some((val) => val === undefined)

      if (subInfoCheck || pricesCheck) {
        setAlarm(true)
        break
      } else {
        setAlarm(false)
      }
    }
  }, [subsState])

  useEffect(() => {
    console.log(subsState)
  }, [subsState])

  return (
    <div className="SubscriptionMaker-body">
      <Navigation
        {...{
          nav,
          setNav,
          setSubsState,
          setChanged,
          setCurrentQtyState,
          initialSubState: INITIAL_STATE,
        }}
      />
      <Loader isLoading={false} />
      <SaveBtn isChanged={isChanged} />
      <LangSupport
        {...{ subsState, setSubsState, setChanged, setCurrentLangState }}
      />
      <QtySelector {...{ nav, subsState, setSubsState, setChanged }} />
      <CreationModal {...{ nav, subsState, setSubsState, setChanged }} />
      <LangTabs
        {...{
          currentLangState,
          setCurrentLangState,
          subs: subsState.subs,
          supportedLang: subsState.supportedLang,
        }}
      />
      <QtyVisualSelector
        {...{
          currentQtyState,
          setCurrentQtyState,
          subs: subsState.subs,
          qty: subsState.qty,
        }}
      />
      <List {...{ currentQtyState, subsState, currentLangState, isAlarm }} />
    </div>
  )
}

export default SubsMakerPage
