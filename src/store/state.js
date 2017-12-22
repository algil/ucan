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
  ],
  dogSizes: [
    {id: 1, name: 'size.xSmall'},
    {id: 2, name: 'size.small'},
    {id: 3, name: 'size.medium'},
    {id: 4, name: 'size.large'},
    {id: 5, name: 'size.xLarge'},
    {id: 6, name: 'size.huge'}
  ]
};
