import FmCheckbox from "./Checkbox.vue";
import CheckboxListStory from "./CheckboxListStory.vue";
import {ref} from 'vue';

const meta = {
    title: 'Components/FmCheckbox',
    component: FmCheckbox,
    args: {
        disabled: false,
        error: false,
    },
};

export default meta;

export const Default = {
    render: (args) => ({
        components: {
            FmCheckbox,
        },
        setup() {
            const value = ref(true);

            return {
                args,
                value,
            };
        },
        template: `<FmCheckbox v-bind="args" v-model="value" />`,
    }),
};

export const List = {
    render: (args) => ({
        components: {
            CheckboxListStory,
        },
        setup() {
            return {
                args,
            };
        },
        template: `<CheckboxListStory />`,
    }),
};
