import React from 'react'
import { useTranslation } from 'react-i18next'

import { PATH } from '@components/Router/RouterConstants'

import DesktopMenu from './components/DesktopMenu'
import MobileMenu from './components/MobileMenu'

import { IMenuItem } from './MenuTypes'

const Menu: React.FC = () => {
  const { t } = useTranslation()

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
      label: t('Menu.Messages'),
      key: PATH.messages,
    },
    {
      label: t('Menu.Admins'),
      key: PATH.admins,
    },
  ]

  return (
    <>
      <DesktopMenu menuItems={menuItems} />
      <MobileMenu menuItems={menuItems} />
    </>
  )
}

export default Menu
