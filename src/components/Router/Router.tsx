import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ROUTES from './RouterRoutes'
import { IRoute } from './RouterTypes'

const Router: React.FC = () => (
  <Routes>
    {ROUTES.map((route: IRoute) => {
      if (route.params) {
        return (
          <Route
            key={`ROUTE${route.path}`}
            path={route.path}
            Component={route.page}
          >
            {route.params.map((param) => (
              <Route
                key={`ROUTE_PARAM${route.path}`}
                path={':' + param}
                Component={route.page}
              />
            ))}
          </Route>
        )
      }

      return (
        <Route
          key={`ROUTE${route.path}`}
          path={route.path}
          Component={route.page}
        />
      )
    })}
  </Routes>
)

export default Router
