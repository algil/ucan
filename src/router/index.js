import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/pages/PageNotFound';
import MainContainer from '@/components/MainContainer';
import BaseContainer from '@/components/BaseContainer';
import HomeView from '@/components/HomeView';
import AdminContainer from '@/components/admin/AdminContainer';
import ServiceList from '@/components/admin/service/ServiceList';
import ServiceItem from '@/components/admin/service/ServiceItem';
import CenterList from '@/components/admin/center/CenterList';
import CenterItem from '@/components/admin/center/CenterItem';
import QuestionCategoryList from '@/components/admin/question-category/QuestionCategoryList';
import QuestionCategoryItem from '@/components/admin/question-category/QuestionCategoryItem';
import QuestionList from '@/components/admin/question/QuestionList';
import QuestionItem from '@/components/admin/question/QuestionItem';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: BaseContainer,
      children: [
        {
          path: '/',
          component: MainContainer,
          children: [
            {path: '/', name: 'Home', component: HomeView}
          ]
        },
        {
          path: '/admin',
          component: AdminContainer,
          children: [
            {path: 'services', name: 'ServiceList', component: ServiceList},
            {path: 'services/:id', name: 'ServiceItem', component: ServiceItem, props: true},
            {path: 'centers', name: 'CenterList', component: CenterList},
            {path: 'centers/:id', name: 'CenterItem', component: CenterItem, props: true},
            {path: 'question-categories', name: 'QuestionCategoryList', component: QuestionCategoryList},
            {path: 'question-categories/:id', name: 'QuestionCategoryItem', component: QuestionCategoryItem, props: true},
            {path: 'questions', name: 'QuestionList', component: QuestionList},
            {path: 'questions/:id', name: 'QuestionItem', component: QuestionItem, props: true}
          ]
        }
      ]
    },
    {path: '*', name: 'NotFound', component: NotFound}
  ],
  mode: 'history'
});
