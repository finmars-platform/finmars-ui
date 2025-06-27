import type { Component, InjectionKey, VNode } from 'vue';
import type { FmDialogComponentProps } from '@/components/fm/Dialog/types';

export type FmDialogInstance = {
	id: string;
	el: HTMLDivElement;
	vNode: VNode;
	destroy: () => void;
};

export interface FmDialogsPlugin {
	$openDialog: <T extends Component>(
		params: FmDialogComponentProps<T>
	) => FmDialogInstance | undefined;
	$closeDialog: (id: string) => void;
	$closeDialogs: () => void;
}

export const FM_DIALOGS_KEY = Symbol() as InjectionKey<FmDialogsPlugin>;
