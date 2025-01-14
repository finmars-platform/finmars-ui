/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FmVueEventBus } from './types';

export function storeVueBus(context: any): { $emitter: FmVueEventBus<any> } {
	const { app = {} } = context;
	const { config = {} } = app;
	const { globalProperties = {} } = config;
	const { $emitter } = globalProperties;
	return { $emitter };
}
