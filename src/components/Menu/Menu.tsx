import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button, Drawer, Menu as AntdMenu, MenuProps } from 'antd'
import { IconBurger } from '@tabler/icons-react'

import { PATH } from '@components/Router/RouterConstants'

import Logo from './components/Logo'
import RightSideBtns from './components/RightSideBtns'

import { IMenuItem } from './MenuTypes'
import './MenuStyles.scss'

const Menu: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [isMenuOpen, setMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState<string>(location.pathname)

  const menuItems: IMenuItem[] = [
    {
      label: t('Menu.Dashboard'),
      key: PATH.dashboard,
    },
    {
      label: t('Menu.Clients'),
      key: PATH.clients,
    },
    {
      label: t('Menu.Billing'),
      key: PATH.billing,
    },
    {
      label: t('Menu.SubscribtionMaker'),
      key: PATH.subscribtionMaker,
    },
    {
      label: t('Menu.Messages'),
      key: PATH.messages,
    },
    {
      label: t('Menu.Admins'),
      key: PATH.admins,
    },
  ]

  const handleControlMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    setCurrentPath(e.key)
    navigate(e.key)
  }

  return (
    <div className="Menu-body">
      <Logo />
      <div className="Menu-body-rightSide">
        <RightSideBtns />
        <Button type="text" icon={<IconBurger />} onClick={handleControlMenu} />
        <Drawer
          title="Basic Drawer"
          onClose={handleControlMenu}
          open={isMenuOpen}
        >
          <AntdMenu
            items={menuItems}
            className="Menu-body-rightSide-menu"
            selectedKeys={
              location.pathname === PATH.profile ? undefined : [currentPath]
            }
            onClick={handleClickMenu}
          />
        </Drawer>
      </div>
    </div>
  )
}

export default Menu
