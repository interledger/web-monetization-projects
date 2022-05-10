import { GraphQLResolveInfo } from 'graphql'

import { Context } from '../../types/context'

export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CoilSubscription = {
  __typename?: 'CoilSubscription'
  active: Scalars['Boolean']
  endDate: Scalars['String']
  trialEndDate: Scalars['String']
}

export type CurrencyPreferences = {
  __typename?: 'CurrencyPreferences'
  code: Scalars['String']
  scale: Scalars['Int']
}

export type PaymentMethod = {
  __typename?: 'PaymentMethod'
  details?: Maybe<PaymentMethodDetails>
  id: Scalars['String']
  type?: Maybe<PaymentMethodType>
}

export type PaymentMethodDetails = StripeCardDetails

export enum PaymentMethodStatus {
  Expired = 'Expired',
  FailedUnknownReason = 'FailedUnknownReason',
  Invalid = 'Invalid',
  Unknown = 'Unknown',
  Valid = 'Valid'
}

export enum PaymentMethodType {
  Stripe = 'stripe',
  TipCredit = 'tipCredit'
}

export type Query = {
  __typename?: 'Query'
  whoami?: Maybe<User>
}

export type StripeCardDetails = {
  __typename?: 'StripeCardDetails'
  brandCode: Scalars['String']
  expirationMonth: Scalars['String']
  expirationYear: Scalars['String']
  funding: Scalars['String']
  last4: Scalars['String']
  name: Scalars['String']
  status: PaymentMethodStatus
}

export type User = {
  __typename?: 'User'
  canTip: Scalars['Boolean']
  currencyPreferences?: Maybe<CurrencyPreferences>
  customerId?: Maybe<Scalars['String']>
  email: Scalars['String']
  fullName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  paymentMethods: Array<Maybe<PaymentMethod>>
  profilePicture?: Maybe<Scalars['String']>
  shortName?: Maybe<Scalars['String']>
  subscription?: Maybe<CoilSubscription>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>
  CoilSubscription: ResolverTypeWrapper<Partial<CoilSubscription>>
  CurrencyPreferences: ResolverTypeWrapper<Partial<CurrencyPreferences>>
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>
  PaymentMethod: ResolverTypeWrapper<
    Partial<
      Omit<PaymentMethod, 'details'> & {
        details?: Maybe<ResolversTypes['PaymentMethodDetails']>
      }
    >
  >
  PaymentMethodDetails: Partial<ResolversTypes['StripeCardDetails']>
  PaymentMethodStatus: ResolverTypeWrapper<Partial<PaymentMethodStatus>>
  PaymentMethodType: ResolverTypeWrapper<Partial<PaymentMethodType>>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Partial<Scalars['String']>>
  StripeCardDetails: ResolverTypeWrapper<Partial<StripeCardDetails>>
  User: ResolverTypeWrapper<Partial<User>>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Partial<Scalars['Boolean']>
  CoilSubscription: Partial<CoilSubscription>
  CurrencyPreferences: Partial<CurrencyPreferences>
  ID: Partial<Scalars['ID']>
  Int: Partial<Scalars['Int']>
  PaymentMethod: Partial<
    Omit<PaymentMethod, 'details'> & {
      details?: Maybe<ResolversParentTypes['PaymentMethodDetails']>
    }
  >
  PaymentMethodDetails: Partial<ResolversParentTypes['StripeCardDetails']>
  Query: {}
  String: Partial<Scalars['String']>
  StripeCardDetails: Partial<StripeCardDetails>
  User: Partial<User>
}

export type CoilSubscriptionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoilSubscription'] = ResolversParentTypes['CoilSubscription']
> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  trialEndDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CurrencyPreferencesResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CurrencyPreferences'] = ResolversParentTypes['CurrencyPreferences']
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  scale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaymentMethodResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']
> = {
  details?: Resolver<
    Maybe<ResolversTypes['PaymentMethodDetails']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<
    Maybe<ResolversTypes['PaymentMethodType']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaymentMethodDetailsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PaymentMethodDetails'] = ResolversParentTypes['PaymentMethodDetails']
> = {
  __resolveType: TypeResolveFn<'StripeCardDetails', ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  whoami?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type StripeCardDetailsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['StripeCardDetails'] = ResolversParentTypes['StripeCardDetails']
> = {
  brandCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  expirationMonth?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  expirationYear?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  funding?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  last4?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<
    ResolversTypes['PaymentMethodStatus'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  canTip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currencyPreferences?: Resolver<
    Maybe<ResolversTypes['CurrencyPreferences']>,
    ParentType,
    ContextType
  >
  customerId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  paymentMethods?: Resolver<
    Array<Maybe<ResolversTypes['PaymentMethod']>>,
    ParentType,
    ContextType
  >
  profilePicture?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  shortName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  subscription?: Resolver<
    Maybe<ResolversTypes['CoilSubscription']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = Context> = {
  CoilSubscription?: CoilSubscriptionResolvers<ContextType>
  CurrencyPreferences?: CurrencyPreferencesResolvers<ContextType>
  PaymentMethod?: PaymentMethodResolvers<ContextType>
  PaymentMethodDetails?: PaymentMethodDetailsResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  StripeCardDetails?: StripeCardDetailsResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
