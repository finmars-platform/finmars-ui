/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'vue';
import type { FmDialogComponentProps } from '@/components/fm/Dialog/types';

export function storeDialogs(context: any): {
	$openDialog: <T extends Component>(params: FmDialogComponentProps<T>) => void;
	$closeDialog: (id: string) => void;
	$closeDialogs: () => void;
} {
	const { app = {} } = context;
	const { config = {} } = app;
	const { globalProperties = {} } = config;
	const { $openDialog, $closeDialog, $closeDialogs } = globalProperties;
	return { $openDialog, $closeDialog, $closeDialogs };
}
