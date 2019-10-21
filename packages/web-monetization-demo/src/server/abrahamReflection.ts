import '@abraham/reflection'

// TODO: https://github.com/abraham/reflection/issues/99#issuecomment-531637606
Object.assign(Reflect, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasMetadata: (mk: any, t: any, pk: any) => !!Reflect.getMetadata(mk, t, pk)
})
