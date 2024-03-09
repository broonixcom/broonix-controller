import React, { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'

import useGetSubs from '@api/subsMakerApi/useGetSubs'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import Layout from '@components/Layout'
// import BlockerModal from '@components/BlockerModal'
import { PATH } from '@components/Router/RouterConstants'
import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

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

  const [subs] = useAtom(subsAtom)

  useEffect(() => {
    if (location.pathname === PATH.subsMaker)
      navigate(location.pathname + '/' + SUB_TYPE.service)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    id && !subs[id].subs.length && getSubs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // const fooBlockerModal = () => {
  //   setChanged(false)
  //   setCurrentQtyState(null)
  //   setSubsState(INITIAL_STATE)
  // }

  return (
    <Layout isLoading={getSubsIsLoading}>
      {/* <BlockerModal verify={isChanged} foo={fooBlockerModal} /> */}
      <div className="SubsMakerPage-body">
        <LangSupport />
        <Navigation />
        {/* check save btn */}
        <SaveBtn />
        {/* check save btn */}
        <QtySelector />
        <CurrentSub />
        <SubsList />
      </div>
    </Layout>
  )
}

export default SubsMakerPage
