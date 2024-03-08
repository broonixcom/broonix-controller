import { IMenuItem } from './MenuTypes'

import { PATH } from '@components/Router/RouterConstants'

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Menu.Dashboard',
    key: PATH.dashboard,
  },
  {
    label: 'Menu.Clients',
    key: PATH.clients,
  },
  {
    label: 'Menu.Messages',
    key: PATH.messages,
  },
  {
    label: 'Menu.Billing',
    key: PATH.billing,
  },
  {
    label: 'Menu.SubsMaker',
    key: PATH.subsMaker,
  },
  {
    label: 'Menu.Services',
    key: PATH.services,
  },
  {
    label: 'Menu.Admins',
    key: PATH.admins,
  },
]
