export function notNullOrUndef<T>(
  t: T | null | undefined,
  name = '<unknown>'
): T | never {
  if (t == null) {
    throw new Error(`Expecting not null for ${name}`)
  } else {
    return t
  }
}
