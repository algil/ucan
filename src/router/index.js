import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import AdminContainer from '../components/admin/AdminContainer.vue';
import ServiceList from '../components/admin/service/ServiceList.vue';
import ServiceForm from '../components/admin/service/ServiceForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {
      path: '/admin',
      component: AdminContainer,
      children: [
        {path: 'services', name: 'service-list', component: ServiceList},
        {path: 'services/:id', name: 'service', component: ServiceForm}
      ]
    }
  ],
  mode: 'history'
});
