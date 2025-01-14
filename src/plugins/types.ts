/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from 'pinia';

export type PiniaActionTree<
	Actions extends Record<string, (...args: any) => any>,
	UsedStore extends Store
> = {
	[Key in keyof Actions]: (
		this: UsedStore,
		...p: Parameters<Actions[Key]>
	) => ReturnType<Actions[Key]>;
};

export type PiniaGetterTree<Getters extends Record<string, any>, UsedStore extends Store> = {
	[k in keyof Getters]: Getters[k] extends (...args: any) => infer R
		? (this: UsedStore & Getters, state: UsedStore['$state']) => (...p: Parameters<Getters[k]>) => R
		: (this: UsedStore & Getters, state: UsedStore['$state']) => Getters[k];
};
