interface F {
  (...args: any[]): void
}

export function debounce(fn: F, wait: number): F {
  let args: IArguments | null = null
  let timer: NodeJS.Timer | null = null

  function flush(): void {
    if (args !== null) fn(...args)
    args = timer = null
  }

  return function(): void {
    if (timer) {
      args = arguments
      clearTimeout(timer)
    } else {
      fn(...arguments)
    }
    timer = setTimeout(flush, wait)
  }
}
