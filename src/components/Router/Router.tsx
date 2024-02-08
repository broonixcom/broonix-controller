import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ROUTES from './RouterRoutes'
import { IRoute } from './RouterTypes'

const Router: React.FC = () => (
  <Routes>
    {ROUTES.map((route: IRoute) => (
      <Route
        key={`ROUTE${route.path}`}
        path={route.path}
        Component={route.page}
      />
    ))}
  </Routes>
)

export default Router
