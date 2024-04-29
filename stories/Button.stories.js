import FinmarsButton from '../src/components/finmars-button/FinmarsButton.vue';

export default {
  title: 'Finmars/FinmarsButton',
  component: FinmarsButton,
  argTypes: {
    class: { control: 'text' },
    style: { control: 'text' },
    onClick: { action: 'clicked' }
    // Add controls for any additional attributes you might want to demonstrate
  }
};

const Template = (args, { argTypes }) => ({
  components: { FinmarsButton },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `<finmars-button :class="args.class" :style="args.style" @click="args.onClick">{{args.default}}</finmars-button>`
});

export const Default = Template.bind({});
Default.args = {
  default: 'Click Me'
};

export const Primary = Template.bind({});
Primary.args = {
  class: 'fm-primary',
  default: 'Primary Button'
};

export const Raised = Template.bind({});
Raised.args = {
  class: 'fm-raised',
  default: 'Raised Button'
};

export const PrimaryRaised = Template.bind({});
PrimaryRaised.args = {
  class: 'fm-primary fm-raised',
  default: 'Primary Raised Button'
};

export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
  style: 'border: 2px solid red;',
  default: 'Stylish Button'
};

export const ClickExample = Template.bind({});
ClickExample.args = {
  class: 'fm-primary fm-raised',
  default: 'Primary Raised Button',
  onClick: () => {
    alert('Button Clicked!');
  }
};
