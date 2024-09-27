import FmAvatar from "./Avatar.vue";
import AvatarListStory from "./AvatarListStory.vue";
import { ref, watch } from 'vue';
import CheckboxListStory from "../Checkbox/CheckboxListStory.vue";

const meta = {
  title: 'Components/FmAvatar',
  component: FmAvatar,
  argTypes: {
    size: {
      control: 'select',
      options: [40, 50, 60, 80],
    },
  },
  args: {
    image: 'https://cdn.vuetifyjs.com/images/john.jpg',
    size: 40
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    components: {
      FmAvatar,
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
    template: `<FmAvatar v-bind="args" :key="key" />`,
  }),
};

export const List = {
  render: (args) => ({
    components: {
      AvatarListStory,
    },
    setup() {
      return {
        args,
      };
    },
    template: `<AvatarListStory />`,
  }),
};
