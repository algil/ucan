<template>
  <v-toolbar dark app :extended="$vuetify.breakpoint.smAndUp" color="primary">
    <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
    <v-toolbar-title v-if="isMobile">{{$store.state.title}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <!--ACTIONS-->
    <service-list-actions key="one" v-if="isMobile && isCurrentRoute('service-list')"></service-list-actions>
    <service-item-actions key="two" v-else-if="isMobile && isCurrentRoute('service-item')"></service-item-actions>
  </v-toolbar>
</template>

<script>
  import ServiceListActions from '../admin/service-list/ServiceListActions.vue';
  import ServiceItemActions from '../admin/service-item/ServiceItemActions.vue';

  export default {
    name: 'app-header',
    components: {
      ServiceListActions,
      ServiceItemActions
    },
    methods: {
      toggleSidebar() {
        this.$store.commit('sidebar', !this.$store.state.sidebar);
      },
      isCurrentRoute(routeName) {
        return this.$route.name === routeName;
      }
    }
  };
</script>
