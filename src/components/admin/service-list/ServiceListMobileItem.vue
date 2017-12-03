<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="service.selected"
        @change="onSelect">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content @click="edit">
      <v-list-tile-title>{{service.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{service.cost}} €</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    name: 'service-list-mobile-item',

    props: {
      service: {
        required: true,
        type: Object
      }
    },

    methods: {
      onSelect () {
        this.$emit('onSelect', this.service);
      },

      edit () {
        this.$router.push({name: 'ServiceItem', params: {id: this.service.id}});
      }
    }
  }
</script>
