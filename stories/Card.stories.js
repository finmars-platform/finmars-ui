import FinmarsCard from "../src/components/finmars-card/FinmarsCard.vue";
import FinmarsCardHeader from "../src/components/finmars-card/FinmarsCardHeader.vue";
import FinmarsCardContent from "../src/components/finmars-card/FinmarsCardContent.vue";
import FinmarsCardFooter from "../src/components/finmars-card/FinmarsCardFooter.vue";
import {FinmarsButton} from "../index";

export default {
  title: 'Finmars/FinmarsCard',
  component: FinmarsCard,
  subcomponents: { FinmarsCardHeader, FinmarsCardContent, FinmarsCardFooter },
};

const Template = (args, { argTypes }) => ({
  components: { FinmarsCard, FinmarsCardHeader, FinmarsCardContent, FinmarsCardFooter, FinmarsButton },
  props: Object.keys(argTypes),
  template: args.template,
});

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('Button clicked!'),
  template: `
    <finmars-card>
      <finmars-card-header>
        <template v-slot:default>
          <h1>This is a header</h1>
        </template>
      </finmars-card-header>
      <finmars-card-content>
        <p>This is the main content of the card.</p>
      </finmars-card-content>
      <finmars-card-footer>
        <finmars-button @click="onClick" class="fm-primary fm-raised">Click me!</finmars-button>
      </finmars-card-footer>
    </finmars-card>
  `,
};

export const NoHeader = Template.bind({});
NoHeader.args = {
  ...Default.args,
  template: `
    <finmars-card>
      <finmars-card-content>
        <p>This is the main content of the card with no header.</p>
      </finmars-card-content>
      <finmars-card-footer>
        <finmars-button @click="onClick">Click me!</finmars-button>
      </finmars-card-footer>
    </finmars-card>
  `,
};

export const NoFooter = Template.bind({});
NoFooter.args = {
  ...Default.args,
  template: `
    <finmars-card>
      <finmars-card-header>
        <template v-slot:default>
          <h1>This is a header</h1>
        </template>
      </finmars-card-header>
      <finmars-card-content>
        <p>This is the main content of the card with no footer.</p>
      </finmars-card-content>
    </finmars-card>
  `,
};
