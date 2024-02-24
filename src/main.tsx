import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import '@dictionary/i18n'
import theme from '@lib/theme'
import Loader from '@components/Loader'
import Router from '@components/Router'

import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Suspense fallback={<Loader isLoading={true} />}>
        <Router />
      </Suspense>
    </ConfigProvider>
  </React.StrictMode>,
)
