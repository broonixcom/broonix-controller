import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Menu, MenuProps } from 'antd'

import { PATH } from '@components/Router/RouterConstants'

import { IMenuProps } from '../../MenuTypes'
import Logo from '../Logo'
import RightSideBtns from '../RightSideBtns'

import './DesktopMenuStyles.scss'

const DesktopMenu: React.FC<IMenuProps> = ({ menuItems }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [currentPath, setCurrentPath] = useState<string>(location.pathname)

  useEffect(() => {
    setCurrentPath(location.pathname)
    // first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    setCurrentPath(e.key)
    navigate(e.key)
  }

  return (
    <div className="DesktopMenu-body">
      <Logo />
      <Menu
        className="DesktopMenu-body-menu"
        mode="horizontal"
        onClick={handleClickMenu}
        selectedKeys={
          location.pathname === PATH.profile ? undefined : [currentPath]
        }
        items={menuItems}
      />
      <RightSideBtns />
    </div>
  )
}

export default DesktopMenu
