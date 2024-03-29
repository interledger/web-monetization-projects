import { IUserPaymentMethod } from '../types/user'

export const getCreditCardFromPaymentMethods = (
  paymentMethodsArr: Array<IUserPaymentMethod> | undefined
): IUserPaymentMethod | undefined => {
  const creditCard = paymentMethodsArr?.find((method: IUserPaymentMethod) => {
    if (method?.type === 'stripe') {
      return method
    }
  })
  return creditCard
}
