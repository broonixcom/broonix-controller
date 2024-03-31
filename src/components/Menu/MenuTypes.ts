import { TablerIconsProps } from '@tabler/icons-react'

export interface IMenuItem {
  label: string
  key: string
  icon: (props: TablerIconsProps) => JSX.Element
}

export interface IMenuProps {
  menuItems: IMenuItem[]
}
