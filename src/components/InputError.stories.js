import InputError from './InputError.vue';

export default {
  title: 'Components/InputError',
  component: InputError,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { InputError },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<InputError :errors="errors" />',
});

export const Default = Template.bind({});
Default.args = {
  errors: ['Error 1', 'Error 2'],
};
