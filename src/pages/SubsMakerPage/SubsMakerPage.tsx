import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { Divider } from 'antd'

import Loader from '@components/Loader'
import useReadData from '@api/useReadData'
import Layout from '@components/Layout'
import BlockerModal from '@components/BlockerModal'
import { API_COLLECTION } from '@api/apiConstants'
import { PATH } from '@components/Router/RouterConstants'

import Navigation from './components/Navigation'
import SaveBtn from './components/SaveBtn'
import QtySelector from './components/QtySelector'
import CreationModal from './components/CreationModal'
import LangTabs from './components/LangTabs'
import QtyVisualSelector from './components/QtyVisualSelector'
import List from './components/List'

import { ISubsState } from './SubsMakerPageTypes'
import { INITIAL_STATE, SUB_TYPE } from './SubsMakerPageConstants'

const SubsMakerPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

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
  const [isItNew, setItNew] = useState(false)

  const readData = useReadData()

  useEffect(() => {
    if (location.pathname === PATH.subsMaker)
      navigate(location.pathname + '/' + SUB_TYPE.service)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    params.id && readData.foo(API_COLLECTION.subscriptions, params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  useEffect(() => {
    readData.data && setSubsState(readData.data as ISubsState)
  }, [readData.data])

  useEffect(() => {
    readData.data ? setItNew(false) : setItNew(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readData.isLoading])

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

  const fooBlockerModal = () => {
    setChanged(false)
    setCurrentQtyState(null)
    setSubsState(INITIAL_STATE)
  }

  return (
    <Layout>
      <BlockerModal verify={isChanged} foo={fooBlockerModal} />
      <div className="SubsMakerPage-body">
        <Navigation
          {...{
            setSubsState,
            isChanged,
            setChanged,
            setCurrentQtyState,
            setItNew,
          }}
        />
        <Loader isLoading={readData.isLoading} />
        <SaveBtn {...{ isChanged, setChanged, subsState, isItNew, setItNew }} />
        <Divider />
        <div className="SubsMakerPage-body-flexContainer">
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
    </Layout>
  )
}

export default SubsMakerPage
