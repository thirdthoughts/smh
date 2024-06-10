/* eslint-disable @typescript-eslint/no-explicit-any */
// the nature of this macro demands "any"
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
    T extends (...args: any) => Promise<infer R> ? R : any