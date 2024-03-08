import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { message } from 'antd'

import { ILoaderProps } from './LoaderTypes'

import './LoaderStyles.scss'

const Loader: React.FC<ILoaderProps> = ({ isLoading }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { t } = useTranslation()

  useEffect(() => {
    isLoading &&
      messageApi.open({
        type: 'loading',
        content: t('Message.Loading'),
        duration: 5000,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  if (!isLoading) return

  return <div>{contextHolder}</div>
}

export default Loader
