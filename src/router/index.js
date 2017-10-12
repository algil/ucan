import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import AdminContainer from '../components/admin/AdminContainer.vue';
import CenterList from '../components/admin/center/CenterList.vue';
import CenterView from '../components/admin/center/CenterForm.vue';
import ServiceList from '../components/admin/service/ServiceList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {
      path: '/admin',
      component: AdminContainer,
      children: [
        {path: 'centers', name: 'CenterList', component: CenterList},
        {path: 'centers/:id', name: 'CenterView', component: CenterView},
        {path: 'services', name: 'ServiceList', component: ServiceList}
      ]
    }
  ],
  mode: 'history'
});
