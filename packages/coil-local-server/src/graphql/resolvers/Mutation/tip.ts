import { MutationResolvers } from '../../generated/graphql'

export const tip: MutationResolvers['tip'] = (parent, args, ctx, info) => {
  return {
    charges: {
      creditCardCharge: '0',
      tipCreditCharge: args.input.amountCentsUsd
    },
    code: '200',
    message: '',
    success: true
  }
}
