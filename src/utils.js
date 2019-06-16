export const compose = (...rest) => x => rest.reduceRight((y, f) => f(y), x)
