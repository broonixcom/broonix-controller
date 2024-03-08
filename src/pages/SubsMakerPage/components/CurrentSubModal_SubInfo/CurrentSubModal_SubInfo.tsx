import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { Tabs, Input } from 'antd'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'
import { SUB_FIELD } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSubModal_SubInfoStyles.scss'

const CurrentSubModal_SubInfo: React.FC = () => {
  const { t } = useTranslation()

  const [langSupport] = useAtom(langSupportAtom)
  const [currentSub, setCurrentSub] = useAtom(currentSubAtom)

  const handleSubInfo = (e: any) => {
    const lang = e.target.getAttribute('lang')
    const field = e.target.getAttribute('name')
    const value = e.target.value

    setCurrentSub({
      ...currentSub,
      sub: {
        ...currentSub.sub,
        subInfo: {
          ...currentSub.sub?.subInfo,
          [lang]: {
            ...currentSub.sub?.subInfo?.[lang],
            [field]: value,
          },
        },
      },
    })
  }

  return (
    <Tabs
      className="CurrentSubModal_SubInfo-body"
      items={langSupport?.map((lang, i) => ({
        key: lang + i,
        label: lang,
        children: (
          <div key={lang + i}>
            <p>
              {t('SubsMakerPage.SubcriptionName')} {lang}
            </p>
            <Input
              className="CurrentSubModal_SubInfo-body-marginBottom"
              name={SUB_FIELD.subNameTxt}
              lang={lang}
              onChange={handleSubInfo}
              value={currentSub.sub?.subInfo?.[lang]?.subNameTxt}
            />
            <p>
              {t('SubsMakerPage.SubcriptionDescription')} {lang}
            </p>
            <Input
              className="CurrentSubModal_SubInfo-body-marginBottom"
              name={SUB_FIELD.subDescTxt}
              lang={lang}
              onChange={handleSubInfo}
              value={currentSub.sub?.subInfo?.[lang]?.subDescTxt}
            />
            <p>
              {t('SubsMakerPage.TotalPriceText')} {lang}
            </p>
            <Input
              className="CurrentSubModal_SubInfo-body-marginBottom"
              name={SUB_FIELD.subTotalTxt}
              lang={lang}
              onChange={handleSubInfo}
              value={currentSub.sub?.subInfo?.[lang]?.subTotalTxt}
            />
          </div>
        ),
      }))}
    />
  )
}

export default CurrentSubModal_SubInfo
