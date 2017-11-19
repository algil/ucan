import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/components/HomeView';
import MainContainer from '@/components/MainContainer';
import AdminContainer from '@/components/admin/AdminContainer';
import ServiceList from '@/components/admin/service-list/ServiceList';
import ServiceItem from '@/components/admin/service-item/ServiceItem';

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
        {path: 'services', name: 'service-list', component: ServiceList},
        {path: 'services/:id', name: 'service-item', component: ServiceItem, props: true}
      ]
    }
  ],
  mode: 'history'
});
