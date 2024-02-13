export interface ISubState {
  subName: string
  subDesc: string
  subMonths: number
  subNoDiscount: number
  pricesPerEmp: { value: number; price: number }[]
}
