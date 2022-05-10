import { QueryResolvers } from '../generated/graphql'

export const whoami: QueryResolvers['whoami'] = async (
  parent,
  args,
  context,
  info
) => {
  return {
    id: '1',
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
