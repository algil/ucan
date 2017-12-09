export default {
  dark: false,
  showBack: false,
  sidebar: null,
  title: '',
  loading: false,
  notification: null,
  appMenuItems: [
    {title: 'menu.home', icon: 'home', href: '/'},
    {title: 'menu.clientNew', icon: 'person_add', href: {name: 'ClientView', params: {clientId: 'new'}}},
    {divider: true},
    {
      title: 'menu.administration',
      icon: 'settings',
      group: 'admin',
      items: [
        {title: 'menu.centers', href: {name: 'CenterList'}},
        {title: 'menu.services', href: {name: 'ServiceList'}},
        {title: 'menu.questionCategories', href: {name: 'QuestionCategoryList'}},
        {title: 'menu.questions', href: {name: 'QuestionList'}}
      ]
    }

  ]
};
