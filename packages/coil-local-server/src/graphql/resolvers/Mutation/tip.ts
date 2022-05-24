import { MutationResolvers } from '../../generated/graphql'

export const tip: MutationResolvers['tip'] = (parent, args, ctx, info) => {
  ctx.log({ field: info.fieldName, args })
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
