export interface ISubsAtom {
  [key: string]: {
    qty?: number[]
    subs: ISub[]
  }
}

export interface ISub {
  subInfo?: {
    [key: string]: {
      subNameTxt?: string
      subDescTxt?: string
      subTotalTxt: string
    }
  }
  subMonths?: number
  pricePerMonth?: number
  pricesPerQty?: { [key: string]: number }
  base?: boolean
  focus?: boolean
}
