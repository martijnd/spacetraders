import TextInput from './TextInput.vue';

export default {
  title: 'Components/TextInput',
  component: TextInput,
};

const Template = (args) => ({
  components: { TextInput },
  setup() {
    return { ...args };
  },
  template: '<TextInput />',
});

export const Primary = Template.bind({});
// Primary.args = {
//   as: 'primary',
// };
