<template>
  <client-actions v-if="isCurrentRoute('Client')"></client-actions>
  <service-list-actions v-else-if="isCurrentRoute('ServiceList')"></service-list-actions>
  <service-item-actions v-else-if="isCurrentRoute('ServiceItem')"></service-item-actions>
  <center-list-actions v-else-if="isCurrentRoute('CenterList')"></center-list-actions>
  <center-item-actions v-else-if="isCurrentRoute('CenterItem')"></center-item-actions>
  <question-category-list-actions v-else-if="isCurrentRoute('QuestionCategoryList')"></question-category-list-actions>
  <question-category-item-actions v-else-if="isCurrentRoute('QuestionCategoryItem')"></question-category-item-actions>
  <question-list-actions v-else-if="isCurrentRoute('QuestionList')"></question-list-actions>
  <question-item-actions v-else-if="isCurrentRoute('QuestionItem')"></question-item-actions>
</template>

<script>
  import ClientActions from '@/components/client/ClientActions';

  import ServiceListActions from '@/components/admin/service-list/ServiceListActions';
  import ServiceItemActions from '@/components/admin/service/ServiceItemActions';
  import CenterListActions from '@/components/admin/center-list/CenterListActions';
  import CenterItemActions from '@/components/admin/center/CenterItemActions';
  import QuestionCategoryListActions from '@/components/admin/question-category-list/QuestionCategoryListActions';
  import QuestionCategoryItemActions from '@/components/admin/question-category/QuestionCategoryItemActions';
  import QuestionListActions from '@/components/admin/question-list/QuestionListActions';
  import QuestionItemActions from '@/components/admin/question/QuestionItemActions';

  export default {
    name: 'app-header-toolbars',

    components: {
      ClientActions,
      ServiceListActions,
      ServiceItemActions,
      CenterListActions,
      CenterItemActions,
      QuestionCategoryListActions,
      QuestionCategoryItemActions,
      QuestionListActions,
      QuestionItemActions
    },

    methods: {
      isCurrentRoute (routeName) {
        return this.$route.name === routeName;
      }
    }
  }
</script>
