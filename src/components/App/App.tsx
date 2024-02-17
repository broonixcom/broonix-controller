import React, { Suspense } from 'react'

import Router from '@components/Router'
import Menu from '@components/Menu'
import Loader from '@components/Loader'

import './AppStyles.scss'

const App: React.FC = () => {
  return (
    <>
      <Menu />
      <Suspense fallback={<Loader isLoading={true} />}>
        <div className="App-body">
          <Router />
        </div>
      </Suspense>
    </>
  )
}

export default App
