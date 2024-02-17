import { ISubsState } from './SubsMakerPageTypes'

export const INITIAL_STATE: ISubsState = {
  supportedLang: ['RU', 'EN'],
  qty: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20],
  subs: [
    {
      subInfo: {
        RU: { subName: '1 год', subDesc: '3 месяца бесплатно' },
        EN: { subName: '1 year', subDesc: '3 months free' },
      },
      subMonths: 12,
      subNoDiscount: 9.99,
      pricesPerQty: {
        3: 7.49,
        4: 9.99,
        5: 12.49,
        6: 14.99,
        7: 16.49,
        8: 18.99,
        9: 20.49,
        10: 22.99,
        11: 24.49,
        12: 26.99,
        13: 28.49,
        14: 30.99,
        15: 32.49,
        20: 37.49,
      },
    },
  ],
}

// export const INITIAL_STATE: ISubsState = {
//   supportedLang: [],
//   qty: [],
//   subs: [],
// }
