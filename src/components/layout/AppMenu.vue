<template>
  <v-list dense>
    <template v-for="item in items">
      <v-list-group
        v-if="item.items"
        :group="item.group">
        <!-- Group header -->
        <v-list-tile slot="activator" ripple>
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
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
          v-if="item.icon"
          color="grey darken-1"
          class="mr-2">
          {{item.icon}}
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
          <v-icon>{{item.icon}}</v-icon>
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
          {title: this.$t('menu.home'), icon: 'home', href: '/'},
          {title: this.$t('menu.clientNew'), icon: 'person_add', href: '/client/new'},
          {title: this.$t('menu.petNew'), icon: 'person_add', href: '/pet/new'},
          {divider: true},
          {
            title: this.$t('menu.administration'),
            icon: 'settings',
            group: 'admin',
            items: [
              {title: this.$t('menu.centers'), href: {name: 'CenterList'}},
              {title: this.$t('menu.services'), href: {name: 'ServiceList'}},
              {title: this.$t('menu.questionCategories'), href: {name: 'QuestionCategoryList'}},
              {title: this.$t('menu.questions'), href: {name: 'QuestionList'}}
            ]
          }
        ]
      };
    }
  };
</script>
