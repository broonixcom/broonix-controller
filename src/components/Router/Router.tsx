import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import ErrorPage from '@pages/ErrorPage'

import ROUTES from './RouterRoutes'
import { IRoute } from './RouterTypes'

const Router: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      ROUTES.map((route: IRoute) => {
        if (route.params) {
          return (
            <Route
              key={`ROUTE${route.path}`}
              path={route.path}
              Component={route.page}
              errorElement={<ErrorPage />}
            >
              {route.params.map((param) => (
                <Route
                  key={`ROUTE_PARAM${route.path}`}
                  path={':' + param}
                  Component={route.page}
                  errorElement={<ErrorPage />}
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
            errorElement={<ErrorPage />}
          />
        )
      }),
    ),
  )

  return <RouterProvider router={router} />
}

export default Router
