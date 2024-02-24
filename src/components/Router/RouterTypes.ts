export interface IRoute {
  path: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  page: React.LazyExoticComponent<React.FC<{}>>
  params?: string[]
}
