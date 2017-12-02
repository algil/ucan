<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="center.selected"
        @change="onSelect(center)">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>{{center.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{center.cost}} €</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    name: 'center-list-mobile-item',

    props: {
      center: {
        required: true,
        type: Object
      }
    },

    methods: {
      onSelect (center) {
        this.$emit('onSelect', this.center);
      }
    }
  }
</script>
