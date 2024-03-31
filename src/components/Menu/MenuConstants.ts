import {
  IconLayoutDashboard,
  IconUsers,
  IconMessages,
  IconMoneybag,
  IconBackhoe,
  IconListDetails,
  IconRobot,
} from '@tabler/icons-react'

import { IMenuItem } from './MenuTypes'

import { PATH } from '@components/Router/RouterConstants'

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Menu.Dashboard',
    key: PATH.dashboard,
    icon: IconLayoutDashboard,
  },
  {
    label: 'Menu.Clients',
    key: PATH.clients,
    icon: IconUsers,
  },
  {
    label: 'Menu.Messages',
    key: PATH.messages,
    icon: IconMessages,
  },
  {
    label: 'Menu.Billing',
    key: PATH.billing,
    icon: IconMoneybag,
  },
  {
    label: 'Menu.SubsMaker',
    key: PATH.subsMaker,
    icon: IconBackhoe,
  },
  {
    label: 'Menu.Services',
    key: PATH.services,
    icon: IconListDetails,
  },
  {
    label: 'Menu.Admins',
    key: PATH.admins,
    icon: IconRobot,
  },
]
