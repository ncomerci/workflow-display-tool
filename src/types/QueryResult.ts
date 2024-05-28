export type QueryResult<T, K extends keyof never> = {
  [P in K]: T
}
