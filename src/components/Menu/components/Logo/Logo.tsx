import React from 'react'
import { useTranslation } from 'react-i18next'

import './LogoStyles.scss'

const Logo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="Logo-body">
      {t('Logo')}
      <div className="Logo-body-subTitle">{t('LogoSubTitle')}</div>
    </div>
  )
}

export default Logo
