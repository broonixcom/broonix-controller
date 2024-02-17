import React from 'react'

import { Tabs } from 'antd'

import './LangTabsStyles.scss'
import { ILangTabsProps } from './LangTabsTypes'

const LangTabs: React.FC<ILangTabsProps> = ({
  subs,
  supportedLang,
  currentLangState,
  setCurrentLangState,
}) => {
  if (!subs.length) {
    return
  }

  const handleSelectLang = (key: string) => {
    setCurrentLangState(key)
  }

  return (
    <div className="LangTabs-body">
      <Tabs
        items={supportedLang.map((lang) => ({ key: lang, label: lang }))}
        onChange={handleSelectLang}
        defaultActiveKey={currentLangState}
      />
    </div>
  )
}

export default LangTabs
