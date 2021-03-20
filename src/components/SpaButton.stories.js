import SpaButton from './SpaButton.vue';

export default {
  title: 'Components/SpaButton',
  component: SpaButton,
};

const Template = (args) => ({
  components: { SpaButton },
  setup() {
    return { ...args };
  },
  template: '<SpaButton :as="as" :variant="variant">{{ text }}</SpaButton>',
});

export const Primary = Template.bind({});
Primary.args = {
  as: 'primary',
  text: 'Primary',
};

export const PrimaryDanger = Template.bind({});
PrimaryDanger.args = {
  as: 'danger',
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  as: 'primary',
  variant: 'secondary',
  text: 'Secondary',
};

export const SecondaryDanger = Template.bind({});
SecondaryDanger.args = {
  as: 'danger',
  variant: 'secondary',
  text: 'Secondary',
};
