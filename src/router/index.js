import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/components/HomeView';
import MainContainer from '@/components/MainContainer';
import AdminContainer from '@/components/admin/AdminContainer';
import ServiceList from '@/components/admin/service/ServiceList';
import ServiceItem from '@/components/admin/service/ServiceItem';
import CenterList from '@/components/admin/center/CenterList';
import CenterItem from '@/components/admin/center/CenterItem';
import QuestionCategoryList from '@/components/admin/question-category/QuestionCategoryList';
import QuestionCategoryItem from '@/components/admin/question-category/QuestionCategoryItem';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: MainContainer,
      children: [
        {path: '/', name: 'home', component: HomeView}
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
        {path: 'question-categories/:id', name: 'QuestionCategoryItem', component: QuestionCategoryItem, props: true}
      ]
    }
  ],
  mode: 'history'
});
