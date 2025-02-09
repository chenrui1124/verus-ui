export function generateOptions<T extends string>(options: T[]) {
  return (...args: T[]) => {
    return new Array(...new Set(args.length === 0 ? options : args))
  }
}
