<template>
  <v-list dense>
    <template v-for="item in items">
      <v-list-group
        v-if="item.items"
        key="menu-items"
        :group="item.group">
        <!-- Group header -->
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon>{{item.action}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <!-- Sub items -->
        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          :to="subItem.href"
          ripple
          :disable="subItem.disable"
          exact>
          <v-list-tile-content>
            <v-list-tile-title>{{subItem.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-subheader
        v-else-if="item.header"
        key="menu-items"
        class="mt-3 grey--text text--darken-1">
        <v-icon
          v-if="item.action"
          color="grey darken-1"
          class="mr-2">
          {{item.action}}
        </v-icon>
        <span>{{item.header}}</span>
      </v-subheader>

      <v-divider v-else-if="item.divider" key="menu-items"></v-divider>

      <!-- Item without group -->
      <v-list-tile
        v-else
        :disabled="item.disabled"
        :to="item.href"
        exact>
        <v-list-tile-action>
          <v-icon>{{item.action}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'app-menu',

    data () {
      return {
        items: [
          {title: this.$t('menu.home'), action: 'home', href: '/'},
          {title: this.$t('menu.clientNew'), action: 'person_add', href: '/client/new'},
          {title: this.$t('menu.petNew'), action: 'person_add', href: '/pet/new'},
          {divider: true},
          {
            title: this.$t('menu.administration'),
            action: 'settings',
            group: 'admin',
            items: [
              {title: this.$t('menu.centers'), action: 'home', href: {name: 'CenterList'}},
              {title: this.$t('menu.services'), action: 'service', href: '/admin/services'}
            ]
          }
        ]
      };
    }
  };
</script>
