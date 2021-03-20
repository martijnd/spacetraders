import TableContainer from './TableContainer.vue';

export default {
  title: 'Components/TableContainer',
  component: TableContainer,
};

const Template = (args) => ({
  components: { TableContainer },
  setup() {
    return { ...args };
  },
  template: `
  <TableContainer :items="items" :headers="headers" />`,
});


export const Small = Template.bind({});
Small.args = {
  items: [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@example.com',
    },
  ],
  headers: [
    { key: 'name', text: 'Name' },
    { key: 'email', text: 'E-mail' },
  ],
};

const items = [
  {
    id: 1,
    name: 'Tyrell',
    email: 'Tyrell11@hotmail.com',
    birthday: '1/10/1991',
    lovesCats: 'Yes',
    lovesDogs: 'No'
  },
  {
    id: 2,
    name: 'Bernadine',
    email: 'Marilie.Balistreri@yahoo.com',
    birthday: '8/22/2005',
    lovesCats: 'No',
    lovesDogs: 'Yes'
  },
  {
    id: 3,
    name: 'Sydney',
    email: 'Melany.Morissette3@gmail.com',
    birthday: '4/14/1990',
    lovesCats: 'Yes',
    lovesDogs: 'Yes'
  },{
    id: 4,
    name: 'Bernadine',
    email: 'Marilie.Balistreri@yahoo.com',
    birthday: '8/22/2005',
    lovesCats: 'No',
    lovesDogs: 'Yes'
  },
  {
    id: 5,
    name: 'Sydney',
    email: 'Melany.Morissette3@gmail.com',
    birthday: '4/14/1990',
    lovesCats: 'Yes',
    lovesDogs: 'Yes'
  },{
    id: 6,
    name: 'Bernadine',
    email: 'Marilie.Balistreri@yahoo.com',
    birthday: '8/22/2005',
    lovesCats: 'No',
    lovesDogs: 'Yes'
  },
  {
    id: 7,
    name: 'Sydney',
    email: 'Melany.Morissette3@gmail.com',
    birthday: '4/14/1990',
    lovesCats: 'Yes',
    lovesDogs: 'Yes'
  }
];

export const Large = Template.bind({});
Large.args = {
  items,
  headers: [
    { key: 'name', text: 'Name' },
    { key: 'email', text: 'E-mail' },
    { key: 'birthday', text: 'Birthday' },
    { key: 'lovesCats', text: 'Loves cats?' },
    { key: 'lovesDogs', text: 'Loves dogs?' },
  ],
};
