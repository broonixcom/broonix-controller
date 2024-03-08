import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import '@dictionary/i18n'
import theme from '@lib/theme'
import Loader from '@components/Loader'
import Router from '@components/Router'

import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme}>
    <React.Suspense fallback={<Loader isLoading={true} />}>
      <Router />
    </React.Suspense>
  </ConfigProvider>,
)
