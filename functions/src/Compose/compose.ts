export const compose =
  (...fns: any) =>
  (value: any) =>
    fns.reduceRight((previousValue: any, fn: any) => fn(previousValue), value)
