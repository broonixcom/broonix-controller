import { ISubsState } from './SubsMakerPageTypes'

// export const INITIAL_STATE: ISubsState = {
//   supportedLang: ['RU', 'EN'],
//   qty: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20],
//   subs: [
//     {
//       subInfo: {
//         RU: {
//           subName: '1 год',
//           subDesc: '3 месяца бесплатно',
//           subTotal: 'за 1 год',
//         },
//         EN: {
//           subName: '1 year',
//           subDesc: '3 months free',
//           subTotal: 'per 1 year',
//         },
//       },
//       subMonths: 12,
//       pricesPerQty: {
//         3: 7.49,
//         4: 9.99,
//         5: 12.49,
//         6: 14.99,
//         7: 16.49,
//         8: 18.99,
//         9: 20.49,
//         10: 22.99,
//         11: 24.49,
//         12: 26.99,
//         13: 28.49,
//         14: 30.99,
//         15: 32.49,
//         20: 37.49,
//       },
//     },
//     {
//       subInfo: {
//         RU: {
//           subName: '3 месяца',
//           subDesc: 'Базовая подписка',
//           subTotal: 'за 3 месяца',
//         },
//         EN: {
//           subName: '3 months',
//           subDesc: 'Base subscription',
//           subTotal: 'per 3 months',
//         },
//       },
//       subMonths: 3,
//       pricesPerQty: {
//         3: 9.99,
//         4: 13.99,
//         5: 17.99,
//         6: 21.99,
//         7: 25.99,
//         8: 29.99,
//         9: 33.99,
//         10: 37.99,
//         11: 41.99,
//         12: 45.99,
//         13: 49.99,
//         14: 53.99,
//         15: 57.99,
//         20: 67.99,
//       },
//     },
//   ],
// }

export const INITIAL_STATE: ISubsState = {
  supportedLang: [],
  qty: [],
  subs: [],
}

export const SUB_TYPE = {
  service: 'service',
  rental: 'rental',
  place: 'place',
  hotel: 'hotel',
  cinema: 'cinema',
}
