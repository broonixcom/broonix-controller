export interface ISubsState {
  supportedLang: string[]
  qty: number[]
  subs: ISub[]
}

export interface ISub {
  subInfo: {
    [key: string]: { subName?: string; subDesc?: string; subTotal?: string }
  }
  subMonths: number
  pricePerMonth?: number
  pricesPerQty?: { [key: string]: number }
  base?: boolean
}
