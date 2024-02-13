import React, { Suspense } from 'react'

import { Skeleton } from 'antd'

import Router from '@components/Router'
import Menu from '@components/Menu'

import './AppStyles.scss'

const App: React.FC = () => {
  return (
    <>
      <Menu />
      <Suspense
        fallback={
          <Skeleton.Input active size="large" style={{ width: '100vw' }} />
        }
      >
        <div className="App-body">
          <Router />
        </div>
      </Suspense>
    </>
  )
}

export default App
