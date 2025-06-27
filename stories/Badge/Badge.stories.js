import FmBadge from '@/components/fm/Badge/Badge.vue';
import { ref, watch } from 'vue';

const meta = {
	title: 'Components/FmBadge',
	component: FmBadge,
	args: {
		content: '2',
		dot: false
	}
};

export default meta;

export const Default = {
	render: (args) => ({
		components: {
			FmBadge
		},
		setup() {
			const key = ref(1);

			watch(args, () => {
				key.value = new Date().getTime();
			});

			return {
				args,
				key
			};
		},
		template: `
			<FmBadge v-bind="args" :key="key">
				<div>lol</div>
			</FmBadge>`
	})
};
