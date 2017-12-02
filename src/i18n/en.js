export default {
  app: {
    name: 'Ucan',
    description: 'Pet care and training'
  },
  pages: {
    notFound: {
      title: 'Page not found',
      message: 'Ups, We can not find what you\'re looking for.',
      action: 'Go to home'
    }
  },
  menu: {
    home: 'Home',
    clientNew: 'New client',
    petNew: 'New pet',
    administration: 'Administration',
    centers: 'Centers',
    centerNew: 'New center',
    services: 'Services',
    questionCategories: 'Question categories',
    questions: 'Questions'
  },
  label: {
    active: 'Active',
    back: 'Back',
    cancel: 'Cancel',
    category: 'Category',
    close: 'Close',
    cost: 'Cost',
    delete: 'Delete',
    edit: 'Edit',
    name: 'Name',
    new: 'New',
    ok: 'Ok',
    order: 'Order',
    save: 'Save'
  },
  service: {
    titleList: 'Services',
    titleNew: 'New service',
    noData: 'There aren\'t services. You can add a new one with the \'New\' button',
    deleteSuccess: 'Service deleted | Services deleted',
    saveSuccess: 'Service saved',
    deleteDialog: {
      title: 'Delete service \'{value}\' | Delete {value} services',
      message: 'Are you sure you want to delete the selected service? This action can not be undone. | Are you sure you want to delete the selected services? This action can not be undone.'
    }
  },
  center: {
    titleList: 'Centers',
    titleNew: 'New center',
    noData: 'There aren\'t centers. You can add a new one with the \'New\' button',
    deleteSuccess: 'Center deleted | Centers deleted',
    saveSuccess: 'Center saved',
    deleteDialog: {
      title: 'Delete center \'{value}\' | Delete {value} centers',
      message: 'Are you sure you want to delete the selected center? This action can not be undone. | Are you sure you want to delete the selected centers? This action can not be undone.'
    }
  },
  questionCategory: {
    titleList: 'Question categories',
    titleNew: 'New question category',
    noData: 'There aren\'t question categories. You can add a new one with the \'New\' button',
    deleteSuccess: 'Question category deleted | Question categories deleted',
    saveSuccess: 'Question category saved',
    deleteDialog: {
      title: 'Delete question category \'{value}\' | Delete {value} question categories',
      message: 'Are you sure you want to delete the selected question category? This action can not be undone. | Are you sure you want to delete the selected question categories? This action can not be undone.'
    }
  },
  question: {
    titleList: 'Questions',
    titleNew: 'New question',
    noData: 'There aren\'t questions. You can add a new one with the \'New\' button',
    deleteSuccess: 'Question deleted | Questions deleted',
    saveSuccess: 'Question saved',
    deleteDialog: {
      title: 'Delete question \'{value}\' | Delete {value} questions',
      message: 'Are you sure you want to delete the selected question? This action can not be undone. | Are you sure you want to delete the selected questions? This action can not be undone.'
    }
  }
}
