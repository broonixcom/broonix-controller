import { FunctionComponent } from 'react'

export interface IRoute {
  path: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  page: FunctionComponent<{}>
}
