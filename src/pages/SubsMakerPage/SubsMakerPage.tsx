import React, { useState, useEffect } from 'react'

import { Divider } from 'antd'

import Loader from '@components/Loader'

import Navigation from './components/Navigation'
import SaveBtn from './components/SaveBtn'
import QtySelector from './components/QtySelector'
import LangSupport from './components/LangSupport'
import CreationModal from './components/CreationModal'
import LangTabs from './components/LangTabs'
import QtyVisualSelector from './components/QtyVisualSelector'
import List from './components/List'

import './SubsMakerPageStyles.scss'
import { INITIAL_STATE } from './SubsMakerPageConstants'

const SubsMakerPage: React.FC = () => {
  const [subsState, setSubsState] = useState(INITIAL_STATE)
  const [isChanged, setChanged] = useState(false)
  const [isAlarm, setAlarm] = useState(false)
  const [currentQtyState, setCurrentQtyState] = useState<number | null>(
    subsState.qty[0],
  )
  const [currentLangState, setCurrentLangState] = useState(
    subsState.supportedLang[0],
  )
  const [subForEdit, setSubForEdit] = useState<number>()
  const [isCreateModalOpened, setCreateModalOpen] = useState(false)
  const [isCreateModalRendered, setCreateModalRender] = useState(false)

  useEffect(() => {
    for (const { subInfo, pricesPerQty } of subsState.subs) {
      const subInfoCheck = Object.values(subInfo).some(
        (val) => val.subDesc === undefined || val.subName === undefined,
      )
      const pricesCheck =
        pricesPerQty &&
        Object.values(pricesPerQty).some((val) => val === undefined)

      if (subInfoCheck || pricesCheck) {
        setAlarm(true)
        break
      } else {
        setAlarm(false)
      }
    }

    setCurrentQtyState(subsState.qty[0])
    setCurrentLangState(subsState.supportedLang[0])
  }, [subsState])

  useEffect(() => {
    console.log(subsState)
  }, [subsState])

  return (
    <div className="SubsMakerPage-body">
      <Navigation
        {...{
          setSubsState,
          setChanged,
          setCurrentQtyState,
          initialSubState: INITIAL_STATE,
        }}
      />
      <Loader isLoading={false} />
      <SaveBtn {...{ isChanged, subsState }} />
      <Divider />
      <div className="SubsMakerPage-body-flexContainer">
        <LangSupport
          {...{ subsState, setSubsState, setChanged, setCurrentLangState }}
        />
        <QtySelector {...{ subsState, setSubsState, setChanged }} />
      </div>
      <CreationModal
        {...{
          subsState,
          setSubsState,
          setChanged,
          subForEdit,
          setSubForEdit,
          isCreateModalOpened,
          setCreateModalOpen,
          isCreateModalRendered,
          setCreateModalRender,
        }}
      />
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
      <List
        {...{
          currentQtyState,
          subsState,
          setSubsState,
          currentLangState,
          isAlarm,
          setChanged,
          setSubForEdit,
          setCreateModalOpen,
          setCreateModalRender,
        }}
      />
    </div>
  )
}

export default SubsMakerPage
