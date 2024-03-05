import React from 'react'
import { useTranslation } from 'react-i18next'

import { BigHead } from '@bigheads/core'

import Layout from '@components/Layout'

import './ErrorPageStyles.scss'

const ErrorPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="ErrorPage-body">
        <div className="ErrorPage-body-iconsContainer">
          <BigHead
            accessory="none"
            body="chest"
            circleColor="blue"
            clothing="naked"
            clothingColor="black"
            eyebrows="angry"
            eyes="leftTwitch"
            faceMask={false}
            faceMaskColor="red"
            facialHair="none"
            graphic="none"
            hair="afro"
            hairColor="blonde"
            hat="beanie"
            hatColor="green"
            lashes
            lipColor="green"
            mask
            mouth="sad"
            skinTone="light"
          />
        </div>
        <p>{t('ErrorPage.ErrorTextFact')}</p>
        <p>{t('ErrorPage.ErrorTextTip')}</p>
      </div>
    </Layout>
  )
}

export default ErrorPage
