import StatisticCard from './StatisticCard.vue';

export default {
  title: 'Components/StatisticCard',
  component: StatisticCard,
};

const Template = (args) => ({
  components: { StatisticCard },
  setup() {
    return { ...args };
  },
  template: '<StatisticCard :title="title" :amount="amount" />',
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Users',
  amount: '100',
};

