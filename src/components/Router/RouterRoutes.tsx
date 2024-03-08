import { lazy } from 'react'

import { PATH, PARAM } from './RouterConstants'
import { IRoute } from './RouterTypes'

const AuthPage = lazy(() => import('@pages/AuthPage'))
const ErrorPage = lazy(() => import('@pages/ErrorPage'))
const ProfilePage = lazy(() => import('@pages/ProfilePage'))

const DashboardPage = lazy(() => import('@pages/DashboardPage'))
const ClientsPage = lazy(() => import('@pages/ClientsPage'))
const MessagesPage = lazy(() => import('@pages/MessagesPage'))
const BillingPage = lazy(() => import('@pages/BillingPage'))
const SubsMakerPage = lazy(() => import('@pages/SubsMakerPage'))
const ServicesPage = lazy(() => import('@pages/ServicesPage'))
const AdminsPage = lazy(() => import('@pages/AdminsPage'))

const ROUTER: IRoute[] = [
  {
    path: PATH.auth,
    page: AuthPage,
  },
  {
    path: '*',
    page: ErrorPage,
  },
  {
    path: PATH.profile,
    page: ProfilePage,
  },
  {
    path: PATH.dashboard,
    page: DashboardPage,
  },
  {
    path: PATH.clients,
    page: ClientsPage,
  },
  {
    path: PATH.messages,
    page: MessagesPage,
  },
  {
    path: PATH.billing,
    page: BillingPage,
  },
  {
    path: PATH.subsMaker,
    page: SubsMakerPage,
    params: [PARAM.id],
  },
  {
    path: PATH.services,
    page: ServicesPage,
  },
  {
    path: PATH.admins,
    page: AdminsPage,
  },
]

export default ROUTER
