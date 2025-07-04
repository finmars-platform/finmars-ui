/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import './assets/css/main.css';
import {
	Ripple,
	ClickOutside,
	Mutate,
	Resize,
	Intersect,
	Scroll,
	Tooltip
} from 'vuetify/directives';
import FmAvatar from '@/components/fm/Avatar/Avatar.vue';
import FmBadge from '@/components/fm/Badge/Badge.vue';
import FmButton from '@/components/fm/Button/Button.vue';
import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue';
import FmChip from '@/components/fm/Chip/Chip.vue';
import type { FmChipEmits, FmChipProps, FmChipSlots } from '@/components/fm/Chip/types';
import FmDateEditor from '@/components/fm/DateEditor/DateEditor.vue';
import type { FmDateEditorEmits, FmDateEditorProps } from '@/components/fm/DateEditor/types';
import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue';
import type { FmDatePickerProps, FmDatePickerEmits } from '@/components/fm/DatePicker/types';
import FmIcon from '@/components/fm/Icon/Icon.vue';
import type { FmIconProps, FmIconSlots } from '@/components/fm/Icon/types';
import FmIconButton from '@/components/fm/IconButton/IconButton.vue';
import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker/ItemPicker.vue';
import type {
	FmItemPickerEmits,
	FmItemPickerProps
} from '@/components/fm/ItemPicker/ItemPicker/types';
import FmLogo from '@/components/fm/Logo/Logo.vue';
import FmMenuItem from '@/components/fm/Menu/MenuItem.vue';
import FmMenu from '@/components/fm/Menu/Menu.vue';
import FmNavigationPortal from '@/components/fm/Navigation/NavigationPortal.vue';
import FmNavigation from '@/components/fm/Navigation/Navigation.vue';
import FmPagination from '@/components/fm/Pagination/Pagination.vue';
import type { FmPaginationEmits, FmPaginationProps } from '@/components/fm/Pagination/types';
import FmProgressCircular from '@/components/fm/ProgressCircular/ProgressCircular.vue';
import FmProgressLinear from '@/components/fm/ProgressLinear/ProgressLinear.vue';
import FmRadio from '@/components/fm/Radio/Radio.vue';
import FmRadioGroup from '@/components/fm/Radio/RadioGroup.vue';
import FmRangeSlider from '@/components/fm/RangeSlider/RangeSlider.vue';
import FmSearch from '@/components/fm/Search/Search.vue';
import FmVSelect from '@/components/fm/VSelect/VSelect.vue';
import type { FmVSelectEmits, FmVSelectProps, FmVSelectSlots } from '@/components/fm/VSelect/types';
import FmSelect from '@/components/fm/Select/Select.vue';
import FmSelectActivator from '@/components/fm/Select/SelectActivator.vue';
import type {
	FmSelectActivatorEmits,
	FmSelectActivatorProps,
	FmSelectActivatorSlots,
	FmSelectEmits,
	FmSelectOption,
	FmSelectProps,
	FmSelectSlots
} from '@/components/fm/Select/types';
import FmSlider from '@/components/fm/Slider/Slider.vue';
import FmTextField from '@/components/fm/TextField/TextField.vue';
import FmTooltip from '@/components/fm/Tooltip/Tooltip.vue';
import FmTabs from '@/components/fm/Tabs/Tabs.vue';
import type {
	FmDialogOptions,
	FmFileUploadProps,
	FmUploadFile
} from '@/components/fm/FileUpload/types';
import FmFileUpload from '@/components/fm/FileUpload/FileUpload.vue';
import FmTransferList from '@/components/fm/TransferList/TransferList.vue';
import type { FmTransferListEmits, FmTransferListProps } from '@/components/fm/TransferList/types';
import FmInputDate from '@/components/fm/InputDate/InputDate.vue';
import type { FmInputDateEmits, FmInputDateProps } from '@/components/fm/InputDate/types';
import FmTimePicker from '@/components/fm/TimePicker/TimePicker.vue';
import type { FmTimePickerProps, FmTimePickerEmits } from '@/components/fm/TimePicker/types';
import FmInputTime from '@/components/fm/InputTime/InputTime.vue';
import type { FmInputTimeProps, FmInputTimeEmits } from '@/components/fm/InputTime/types';
import FmDateTree from '@/components/fm/DateTree/DateTree.vue';
import type { FmDateTreeItemProps, FmDateTreeEmits } from '@/components/fm/DateTree/types';
import FmFilterEditor from '@/components/fm/Filters/FilterEditor/FilterEditor.vue';
import type {
	FmFilterEditorEmits,
	FmFilterEditorProps
} from '@/components/fm/Filters/FilterEditor/types';
import FmFilterToolbar from '@/components/fm/Filters/FilterToolbar/FilterToolbar.vue';
import type {
	FmFilterAttribute,
	FmFilterAttributes,
	FmtFilterToolbarEmits,
	FmtFilterToolbarProps
} from '@/components/fm/Filters/FilterToolbar/types';
import FmSwitch from '@/components/fm/Switch/Switch.vue';
import FmBreadcrumbs from '@/components/fm/Breadcrumbs/Breadcrumbs.vue';
import type { FmBreadcrumbItem, FmBreadcrumbProps } from '@/components/fm/Breadcrumbs/types';
import FmDialog from '@/components/fm/Dialog/Dialog.vue';
import type {
	FmDialogProps,
	FmDialogEvent,
	FmDialogComponentProps,
	FmDialogComponentEmits
} from '@/components/fm/Dialog/types';
import FmHeader from '../stories/Header.vue';

import FmHtml from '@/directives/fm/Html';

import { createVuetify } from 'vuetify';
import '@/assets/css/tailwind.css';
import '@mdi/font/css/materialdesignicons.css';

import type { FmDialogInstance } from '@/plugins/dialogs/types';
import type { FmVueEventBus } from '@/plugins/vue-bus/types';
import { NavigationRoutes } from './components/fm/Navigation/Navigation.routes';

export * from '@/types';
export * from '@/utils';
export * from '@/plugins';
export * from '@/plugins/types';

export {
	Ripple,
	ClickOutside,
	Mutate,
	Resize,
	Intersect,
	Scroll,
	Tooltip,
	FmHeader,
	FmNavigationPortal,
	FmNavigation,
	FmAvatar,
	FmBadge,
	FmButton,
	FmCheckbox,
	FmChip,
	FmDateEditor,
	FmDateEditorProps,
	FmDateEditorEmits,
	FmDatePicker,
	FmDatePickerProps,
	FmDatePickerEmits,
	FmDialog,
	FmDialogComponentProps,
	FmDialogComponentEmits,
	FmDialogProps,
	FmDialogEvent,
	FmIcon,
	FmIconButton,
	FmItemPicker,
	FmItemPickerProps,
	FmItemPickerEmits,
	FmLogo,
	FmMenuItem,
	FmMenu,
	FmPagination,
	FmProgressCircular,
	FmProgressLinear,
	FmRadio,
	FmRadioGroup,
	FmRangeSlider,
	FmSearch,
	FmSelect,
	FmSelectActivator,
	FmSlider,
	FmTextField,
	FmTooltip,
	FmVSelect,
	FmUploadFile,
	FmDialogOptions,
	FmFileUploadProps,
	FmFileUpload,
	FmChipProps,
	FmChipEmits,
	FmChipSlots,
	FmTabs,
	FmIconProps,
	FmIconSlots,
	FmPaginationProps,
	FmPaginationEmits,
	FmSelectOption,
	FmSelectActivatorProps,
	FmSelectActivatorEmits,
	FmSelectActivatorSlots,
	FmSelectProps,
	FmSelectEmits,
	FmSelectSlots,
	FmVSelectProps,
	FmVSelectEmits,
	FmVSelectSlots,
	FmTransferList,
	FmTransferListProps,
	FmTransferListEmits,
	FmInputDate,
	FmInputDateProps,
	FmInputDateEmits,
	FmTimePicker,
	FmTimePickerProps,
	FmTimePickerEmits,
	FmInputTime,
	FmInputTimeProps,
	FmInputTimeEmits,
	FmDateTree,
	FmDateTreeItemProps,
	FmDateTreeEmits,
	FmFilterEditor,
	FmFilterEditorProps,
	FmFilterEditorEmits,
	FmFilterToolbar,
	FmFilterAttribute,
	FmFilterAttributes,
	FmtFilterToolbarProps,
	FmtFilterToolbarEmits,
	FmSwitch,
	FmBreadcrumbs,
	FmBreadcrumbProps,
	FmBreadcrumbItem,
	FmHtml,
	NavigationRoutes
};

/**
 * VUE plugin that registers all components
 *
 * @type {{install(*, {}=): void}}
 */
export const uiComponentsPlugin = {
	// @ts-ignore
	install(Vue, args = {} as any) {
		let prefix = '';

		if (args.componentNamePrefix && typeof args.componentNamePrefix === 'string') {
			prefix = args.componentNamePrefix;
		} else if (args.componentNamePrefix === undefined) {
			// "Fm" used as a default prefix
			prefix = 'Fm';
		}

		const vuetify = createVuetify();
		Vue.use(vuetify);

		Vue.component(`${prefix}NavigationPortal`, FmNavigationPortal);
		Vue.component(`${prefix}Navigation`, FmNavigation);
		Vue.component(`${prefix}Header`, FmHeader);
		Vue.component(`${prefix}Avatar`, FmAvatar);
		Vue.component(`${prefix}Badge`, FmBadge);
		Vue.component(`${prefix}Button`, FmButton);
		Vue.component(`${prefix}Checkbox`, FmCheckbox);
		Vue.component(`${prefix}Chip`, FmChip);
		Vue.component(`${prefix}DateEditor`, FmDateEditor);
		Vue.component(`${prefix}DatePicker`, FmDatePicker);
		Vue.component(`${prefix}Dialog`, FmDialog);
		Vue.component(`${prefix}Icon`, FmIcon);
		Vue.component(`${prefix}IconButton`, FmIconButton);
		Vue.component(`${prefix}ItemPicker`, FmItemPicker);
		Vue.component(`${prefix}Logo`, FmLogo);
		Vue.component(`${prefix}MenuItem`, FmMenuItem);
		Vue.component(`${prefix}Menu`, FmMenu);
		Vue.component(`${prefix}FmPagination`, FmPagination);
		Vue.component(`${prefix}ProgressCircular`, FmProgressCircular);
		Vue.component(`${prefix}ProgressLinear`, FmProgressLinear);
		Vue.component(`${prefix}Radio`, FmRadio);
		Vue.component(`${prefix}RadioGroup`, FmRadioGroup);
		Vue.component(`${prefix}RangeSlider`, FmRangeSlider);
		Vue.component(`${prefix}Search`, FmSearch);
		Vue.component(`${prefix}Select`, FmSelect);
		Vue.component(`${prefix}SelectActivator`, FmSelectActivator);
		Vue.component(`${prefix}Slider`, FmSlider);
		Vue.component(`${prefix}TextField`, FmTextField);
		Vue.component(`${prefix}Tooltip`, FmTooltip);
		Vue.component(`${prefix}VSelect`, FmVSelect);
		Vue.component(`${prefix}Tabs`, FmTabs);
		Vue.component(`${prefix}FileUpload`, FmFileUpload);
		Vue.component(`${prefix}TransferList`, FmTransferList);
		Vue.component(`${prefix}InputDate`, FmInputDate);
		Vue.component(`${prefix}FilterEditor`, FmFilterEditor);
		Vue.component(`${prefix}FilterToolbar`, FmFilterToolbar);
		Vue.component(`${prefix}Switch`, FmSwitch);
		Vue.component(`${prefix}Breadcrumbs`, FmBreadcrumbs);

		Vue.directive('FmHtml', FmHtml);
		Vue.directive('Ripple', Ripple);
		Vue.directive('ClickOutside', ClickOutside);
		Vue.directive('Mutate', Mutate);
		Vue.directive('Resize', Resize);
		Vue.directive('Intersect', Intersect);
		Vue.directive('Scroll', Scroll);
		Vue.directive('Tooltip', Tooltip);
	}
};

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$openDialog: <T extends Component>(
			params: FmDialogComponentProps<T>
		) => FmDialogInstance | undefined;
		$closeDialog: (id: string) => void;
		$closeDialogs: () => void;
		$emitter: FmVueEventBus<any>;
	}

	interface GlobalComponents {
		FmNavigationPortal: typeof FmNavigationPortal;
		FmNavigation: typeof FmNavigation;
		FmHeader: typeof FmHeader;
		FmAvatar: typeof FmAvatar;
		FmBadge: typeof FmBadge;
		FmButton: typeof FmButton;
		FmCheckbox: typeof FmCheckbox;
		FmChip: typeof FmChip;
		FmDateEditor: typeof FmDateEditor;
		FmDatePicker: typeof FmDatePicker;
		FmTimePicker: typeof FmTimePicker;
		FmInputTime: typeof FmInputTime;
		FmDateTree: typeof FmDateTree;
		FmDialog: typeof FmDialog;
		FmIcon: typeof FmIcon;
		FmIconButton: typeof FmIconButton;
		FmInputDate: typeof FmInputDate;
		FmItemPicker: typeof FmItemPicker;
		FmFilterEditor: typeof FmFilterEditor;
		FmFilterToolbar: typeof FmFilterToolbar;
		FmLogo: typeof FmLogo;
		FmMenuItem: typeof FmMenuItem;
		FmMenu: typeof FmMenu;
		FmPagination: typeof FmPagination;
		FmProgressCircular: typeof FmProgressCircular;
		FmProgressLinear: typeof FmProgressLinear;
		FmRadio: typeof FmRadio;
		FmRadioGroup: typeof FmRadioGroup;
		FmRangeSlider: typeof FmRangeSlider;
		FmSearch: typeof FmSearch;
		FmSelect: typeof FmSelect;
		FmSelectActivator: typeof FmSelectActivator;
		FmSlider: typeof FmSlider;
		FmTextField: typeof FmTextField;
		FmTooltip: typeof FmTooltip;
		FmVSelect: typeof FmVSelect;
		FmTabs: typeof FmTabs;
		FmFileUpload: typeof FmFileUpload;
		FmTransferListProps: typeof FmTransferList;
		FmSwitch: typeof FmSwitch;
		FmBreadcrumbs: typeof FmBreadcrumbs;
	}

	interface GlobalDirectives {
		FmHtml: typeof FmHtml;
		Ripple: typeof Ripple;
		ClickOutside: typeof ClickOutside;
		Mutate: typeof Mutate;
		Resize: typeof Resize;
		Intersect: typeof Intersect;
		Scroll: typeof Scroll;
		Tooltip: typeof Tooltip;
	}
}
