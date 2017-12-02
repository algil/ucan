export default {
  dark: false,
  showBack: false,
  sidebar: null,
  title: '',
  loading: false,
  notification: null,
  appMenuItems: [
    {title: 'menu.home', icon: 'home', href: '/'},
    {title: 'menu.clientNew', icon: 'person_add', href: '/client/new'},
    {title: 'menu.petNew', icon: 'pets', href: '/pet/new'},
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
