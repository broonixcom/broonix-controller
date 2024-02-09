import React, { Suspense } from 'react'

import { Skeleton } from 'antd'

import Router from '@components/Router'
import Menu from '@components/Menu'

const App: React.FC = () => {
  return (
    <>
      <Menu />
      <Suspense
        fallback={
          <Skeleton.Input active size="large" style={{ width: '100vw' }} />
        }
      >
        <Router />
      </Suspense>
    </>
  )
}

export default App
