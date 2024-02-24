import React from 'react'

import Menu from '@components/Menu'

import './LayoutStyles.scss'
import { ILayout } from './LayoutTypes'

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="Layout-body">
      <Menu />
      <div className="Layout-body-childrenContainer">{children}</div>
    </div>
  )
}

export default Layout
