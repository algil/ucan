<template>
  <v-navigation-drawer
    app
    absolute
    :clipped="$vuetify.breakpoint.smAndUp"
    v-model="isActive">
    <div class="text-xs-center pa-3">
      <div class="display-2 py-2">{{ $t('app.name') }}</div>
      <p>{{ $t('app.description') }}</p>
    </div>

    <v-divider></v-divider>
    <app-menu></app-menu>
  </v-navigation-drawer>
</template>

<script>
  import AppMenu from './AppMenu';

  export default {
    name: 'app-sidebar',

    components: {
      AppMenu
    },

    computed: {
      isActive: {
        get () {
          return this.$store.state.sidebar;
        },
        set (value) {
          this.$store.commit('sidebar', value);
        }
      }
    }
  };
</script>
