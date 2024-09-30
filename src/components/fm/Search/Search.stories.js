import FmSearch from "./Search.vue";
import { ref, watch } from 'vue';

const meta = {
  title: 'Components/FmSearch',
  component: FmSearch,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solo'],
    },
  },
  args: {
    rounded: true,
    variant: 'solo'
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    components: {
      FmSearch,
    },
    setup() {
      const key = ref(1);

      watch(args, () => {
        key.value = new Date().getTime();
      });

      return {
        args,
        key,
      };
    },
    template: `<FmSearch v-bind="args" :key="key" />`,
  }),
};
