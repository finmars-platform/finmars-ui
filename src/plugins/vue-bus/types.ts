/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InjectionKey } from 'vue';

export type CbFunction<T> = (arg: T) => void;

export interface FmVueEventBus<T extends object> {
	on: <Ev extends keyof T>(type: Ev, handler: CbFunction<T[Ev]>) => void;
	off: <Ev extends keyof T>(type: Ev, handler?: CbFunction<T[Ev]>) => void;
	emit: <Ev extends keyof T>(type: Ev, arg: T[Ev]) => void;
	once: <Ev extends keyof T>(type: Ev, handler: CbFunction<T[Ev]>) => void;
	clear: () => void;
}

export interface FmVueBusPlugin<T extends object> {
	$emitter: FmVueEventBus<T>;
}

export const FM_VUEBUS_KEY = Symbol() as InjectionKey<FmVueBusPlugin<any>>;
