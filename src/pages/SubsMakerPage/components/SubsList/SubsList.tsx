import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'

import SubsList_LangTabs from '../SubsList_LangTabs'
import SubsList_QtySelector from '../SubsList_QtySelector'
import SubsList_Item from '../SubsList_Item'

import './SubsListStyles.scss'

const SubsList: React.FC = () => {
  const { id } = useParams()

  const [langSupport] = useAtom(langSupportAtom)
  const [subs] = useAtom(subsAtom)

  const [selectedLang, setSelectedLang] = useState<string>()
  const [selectedQty, setSelecdtedQty] = useState<number>()

  useEffect(() => {
    langSupport && setSelectedLang(langSupport[0])
  }, [langSupport])

  if (!id) return

  if (id && !subs[id].subs.length) {
    return
  }

  return (
    <div className="SubsList-body">
      <SubsList_LangTabs {...{ selectedLang, setSelectedLang }} />
      <SubsList_QtySelector {...{ selectedQty, setSelecdtedQty }} />
      <div className="SubsList-body-listContainer">
        {subs[id].subs.map((sub, index) => (
          <SubsList_Item
            key={id + '_SUB_' + index}
            {...{ sub, index, selectedLang, selectedQty }}
          />
        ))}
      </div>
    </div>
  )
}

export default SubsList
