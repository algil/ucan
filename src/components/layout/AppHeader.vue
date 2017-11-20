<template>
  <v-toolbar
    dark
    app
    :extended="$vuetify.breakpoint.smAndUp"
    color="primary">
    <v-toolbar-side-icon
      v-if="!$store.state.showBack"
      @click.stop="toggleSidebar">
    </v-toolbar-side-icon>
    <v-btn
      icon
      v-if="isMobile && $store.state.showBack"
      @click.stop="onGoBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title v-if="isMobile">{{$store.state.title}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <service-list-actions key="one" v-if="isMobile && isCurrentRoute('ServiceList')"></service-list-actions>
    <service-item-actions key="two" v-else-if="isMobile && isCurrentRoute('ServiceItem')"></service-item-actions>
    <center-list-actions key="two" v-else-if="isMobile && isCurrentRoute('CenterItem')"></center-list-actions>
    <question-category-list-actions key="two" v-else-if="isMobile && isCurrentRoute('QuestionCategoryList')"></question-category-list-actions>
    <question-category-item-actions key="two" v-else-if="isMobile && isCurrentRoute('QuestionCategoryItem')"></question-category-item-actions>
  </v-toolbar>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import ServiceListActions from '@/components/admin/service/ServiceListActions';
  import ServiceItemActions from '@/components/admin/service/ServiceItemActions';
  import CenterListActions from '@/components/admin/center/CenterListActions';
  import QuestionCategoryListActions from '@/components/admin/question-category/QuestionCategoryListActions';
  import QuestionCategoryItemActions from '@/components/admin/question-category/QuestionCategoryItemActions';

  export default {
    name: 'app-header',

    components: {
      ServiceListActions,
      ServiceItemActions,
      CenterListActions,
      QuestionCategoryListActions,
      QuestionCategoryItemActions
    },

    methods: {
      toggleSidebar () {
        this.$store.commit('sidebar', !this.$store.state.sidebar);
      },
      onGoBack () {
        this.$events.emit(EventTypes.GO_BACK);
      },
      isCurrentRoute (routeName) {
        return this.$route.name === routeName;
      }
    }
  };
</script>
