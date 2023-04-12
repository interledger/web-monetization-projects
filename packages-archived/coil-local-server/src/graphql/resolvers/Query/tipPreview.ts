import { QueryResolvers } from '../../generated/graphql'

export const tipPreview: QueryResolvers['tipPreview'] = (
  parent,
  args,
  ctx,
  info
) => {
  return {
    charges: {
      creditCardCharge: '0',
      tipCreditCharge: args.tipAmountCents
    },
    code: '200',
    message: '',
    success: true
  }
}
