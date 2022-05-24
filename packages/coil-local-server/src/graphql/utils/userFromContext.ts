import { Context } from '../../types/context'
import { notNullOrUndef } from '../../utils/nullables'

export function userFromContext(context: Context) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: notNullOrUndef(context.userId, 'context.userId'),
    email: 'niq@coil.com',
    canTip: false,
    paymentMethods: [],
    shortName: 'Niq',
    subscription: {
      active: true,
      endDate: '2022-05-10T03:57:26.230Z',
      trialEndDate: '2022-05-10T03:57:26.230Z'
    }
  }
}
