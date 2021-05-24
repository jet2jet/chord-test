// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyRecursive<T> = T extends object
	? { readonly [P in keyof T]: ReadonlyRecursive<T[P]> }
	: T;
