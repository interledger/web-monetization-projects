interface PolicyResult {
  [key: string]: string[]
}

export function parsePolicyDirectives(policy: string): PolicyResult {
  return policy.split(';').reduce<PolicyResult>((result, directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g)

    if (
      !directiveKey ||
      Object.prototype.hasOwnProperty.call(result, directiveKey)
    ) {
      return result
    } else {
      return {
        ...result,
        [directiveKey]: directiveValue
      }
    }
  }, {})
}
