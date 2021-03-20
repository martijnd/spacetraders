import Alert from './Alert.vue';

export default {
  title: 'Components/Alert',
  component: Alert,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Alert },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<Alert :title="title" :text="text" :type="type" />',
});

export const Info = Template.bind({});
Info.args = {
  title: 'Info',
  text: 'Please make sure to have your passport ready on checkout!',
  type: 'info'
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success!',
  text: 'You succesfully completed the registration process!',
  type: 'success'
};

export const Error = Template.bind({});
Error.args = {
  title: 'Something went wrong!',
  text: 'Please check your input and try again in a few minutes.',
  type: 'error'
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'Warning',
  text: 'You\'ve almost run out of your monthly quota. Make sure to upgrade soon!',
  type: 'warning'
};
