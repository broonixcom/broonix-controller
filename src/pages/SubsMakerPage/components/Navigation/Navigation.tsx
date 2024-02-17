import React from 'react'
import { useTranslation } from 'react-i18next'

import { Menu, MenuProps } from 'antd'
import {
  IconClockStar,
  IconReplace,
  IconMapPin,
  IconBuildingSkyscraper,
  IconMovie,
} from '@tabler/icons-react'

import { PATH } from '@components/Router/RouterConstants'

import './NavigationStyles.scss'
import { INavigationProps } from './NavigationTypes'

const Navigation: React.FC<INavigationProps> = ({
  nav,
  setNav,
  initialSubState,
  setSubsState,
  setChanged,
  setCurrentQtyState,
}) => {
  const { t } = useTranslation()

  const handleClickToMenu: MenuProps['onClick'] = (e) => {
    setChanged(false)
    setCurrentQtyState(null)
    setNav(e.key)
    setSubsState(initialSubState)
  }

  const navItems = [
    {
      label: t('SubsMakerPage.ServiceNav'),
      key: PATH.subsMakerService,
      icon: <IconClockStar />,
    },
    {
      label: t('SubsMakerPage.RentalNav'),
      key: PATH.subsMakerRental,
      icon: <IconReplace />,
    },
    {
      label: t('SubsMakerPage.PlaceNav'),
      key: PATH.subsMakerPlace,
      icon: <IconMapPin />,
    },
    {
      label: t('SubsMakerPage.HotelNav'),
      key: PATH.subsMakerHotel,
      icon: <IconBuildingSkyscraper />,
    },
    {
      label: t('SubsMakerPage.CinemaNav'),
      key: PATH.subsMakerCinema,
      icon: <IconMovie />,
    },
  ]

  return (
    <div className="Navigation-body">
      <Menu
        mode="horizontal"
        items={navItems}
        selectedKeys={[nav]}
        onClick={handleClickToMenu}
      />
    </div>
  )
}

export default Navigation
