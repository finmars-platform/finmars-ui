/* eslint-disable @typescript-eslint/no-explicit-any */
import { createVNode, render } from 'vue';
import type { App, Component, Plugin, VNode } from 'vue';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import { getRandomString } from '@/utils';
import FmDialog from '@/components/fm/Dialog/Dialog.vue';
import type { FmDialogComponentProps, FmDialogProps } from '@/components/fm/Dialog/types';
import { FM_DIALOGS_KEY, type FmDialogInstance, type FmDialogsPlugin } from './types';
import { ExtractComponentProps } from '@/types';

export const dialogs: Plugin = {
	install: (app: App) => {
		let openDialogs: Record<string, { destroy: () => void }> = {};

		const $openDialog = <T extends Component>(
			params: FmDialogComponentProps<T>
		): FmDialogInstance | undefined => {
			const {
				component,
				componentProps = {} as ExtractComponentProps<T>,
				dialogProps = {} as FmDialogProps
			} = params;

			if (!component) {
				throw Error('[Dialog plugin] The dialog component missing');
			}

			const { teleport } = dialogProps || ({} as FmDialogProps);

			const parentElement =
				!teleport || teleport === 'body' ? document.body : document.querySelector(teleport);

			if (parentElement) {
				const randomString = getRandomString(5);
				const id = `dialog-wrapper-${randomString}`;
				let vNode: VNode | null = createVNode(FmDialog, {
					component,
					componentProps,
					dialogProps: {
						...dialogProps,
						id: `dialog-${randomString}`,
						onClose: dialogProps.onClose
							? () => {
									dialogProps.onClose!();
									destroy();
								}
							: () => destroy()
					}
				});
				vNode.appContext = app._context;
				let el: HTMLDivElement | null = document.createElement('div');
				el.id = id;
				render(vNode, el);

				const destroy = () => {
					if (el) {
						const closedDialogId = el.id;
						render(null, el);
						document.body.removeChild(el);
						closedDialogId && delete openDialogs[closedDialogId];
					}
					el = null;
					vNode = null;
				};

				document.body.appendChild(el);
				openDialogs[id] = { destroy };

				return { id, el, vNode, destroy };
			}
		};

		const $closeDialog = (id: string) => {
			const dialog = openDialogs[id];

			if (!dialog) {
				throw Error(`There is no the dialog with the ID "${id}"`);
			}

			dialog.destroy && dialog.destroy();
		};

		const $closeDialogs = () => {
			if (!isEmpty(openDialogs)) {
				for (const d of values(openDialogs)) {
					d.destroy && d.destroy();
				}
				openDialogs = {};
			}
		};

		app.config.globalProperties.$openDialog = $openDialog;
		app.config.globalProperties.$closeDialog = $closeDialog;
		app.config.globalProperties.$closeDialogs = $closeDialogs;
		app.provide<FmDialogsPlugin>(FM_DIALOGS_KEY, { $openDialog, $closeDialog, $closeDialogs });
	}
};

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$openDialog: <T extends Component>(
			params: FmDialogComponentProps<T>
		) => FmDialogInstance | undefined;
		$closeDialog: (id: string) => void;
		$closeDialogs: () => void;
	}
}
