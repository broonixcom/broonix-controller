export interface ISubsState {
  supportedLang: string[]
  qty: number[]
  subs: ISub[]
}

export interface ISub {
  subInfo: {
    [key: string]: { subName?: string; subDesc?: string }
  }
  subMonths: number
  subNoDiscount: number
  pricesPerQty: { [key: string]: number }
}
