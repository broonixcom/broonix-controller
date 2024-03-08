import { ISubsAtom } from './subsAtomTypes'

export const SUB_TYPE = {
  service: 'service',
  rental: 'rental',
  place: 'place',
  hotel: 'hotel',
  cinema: 'cinema',
}

export const SUB_FIELD = {
  subNameTxt: 'subNameTxt',
  subDescTxt: 'subDescTxt',
  subTotalTxt: 'subTotalTxt',
  subMonths: 'subMonths',
  pricePerMonth: 'pricePerMonth',
  pricesPerQty: 'pricesPerQty',
}

export const SUBS_INITIAL_ATOM: ISubsAtom = {
  [SUB_TYPE.service]: {
    qty: [],
    subs: [],
  },
  [SUB_TYPE.rental]: {
    qty: [],
    subs: [],
  },
  [SUB_TYPE.place]: {
    subs: [],
  },
  [SUB_TYPE.hotel]: {
    qty: [],
    subs: [],
  },
  [SUB_TYPE.cinema]: {
    qty: [],
    subs: [],
  },
}
