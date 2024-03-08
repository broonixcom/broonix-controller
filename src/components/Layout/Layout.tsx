import React from 'react'

import Menu from '@components/Menu'
import Loader from '@components/Loader'

import './LayoutStyles.scss'
import { ILayout } from './LayoutTypes'

const Layout: React.FC<ILayout> = ({ isLoading, children }) => {
  return (
    <div className="Layout-body">
      <Loader isLoading={isLoading} />
      <Menu />
      <div className="Layout-body-childrenContainer">{children}</div>
    </div>
  )
}

export default Layout
