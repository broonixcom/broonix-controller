import React, { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import alarmAtom from '@atoms/subsMakerAtoms/alarmAtom'
import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import useGetSubs from '@api/subsMakerApi/useGetSubs'
import Layout from '@components/Layout'
import BlockerModal from '@components/BlockerModal'
import { PATH } from '@components/Router/RouterConstants'
import isEqual from '@helpers/isEqual'

import LangSupport from './components/LangSupport'
import Navigation from './components/Navigation'
import SaveBtn from './components/SaveBtn'
import QtySelector from './components/QtySelector'
import CurrentSub from './components/CurrentSub'
import SubsList from './components/SubsList'

const SubsMakerPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { getSubs, getSubsIsLoading } = useGetSubs()

  const [subs, setSubs] = useAtom(subsAtom)
  const [isAlarm] = useAtom(alarmAtom)

  useEffect(() => {
    if (location.pathname === PATH.subsMaker)
      navigate(location.pathname + '/' + SUB_TYPE.service)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (id && !subs[id].subs?.length) getSubs()
    else id && setSubs({ ...subs, original: subs[id] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!id) return

  const blockVerify = () => {
    if (isAlarm) return true
    if (!isEqual(subs[id], subs.original)) return true
    return false
  }

  return (
    <Layout isLoading={getSubsIsLoading}>
      <BlockerModal verify={blockVerify()} />
      <div className="SubsMakerPage-body">
        <LangSupport />
        <Navigation />
        <SaveBtn />
        <QtySelector />
        <CurrentSub />
        <SubsList />
      </div>
    </Layout>
  )
}

export default SubsMakerPage
