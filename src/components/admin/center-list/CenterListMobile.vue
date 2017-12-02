<template>
  <v-list two-line>
    <template v-for="(center, index) in centers">
      <center-list-mobile-item :center="center" @onSelect="onSelect"></center-list-mobile-item>
      <v-divider v-show="index !== centers.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import CenterListMobileItem from './CenterListMobileItem';

  export default {
    name: 'center-list-mobile',

    components: {
      CenterListMobileItem
    },

    props: {
      centers: {
        required: true,
        type: Array
      }
    },

    data () {
      return {
        selected: [],
        fabButton: null
      };
    },

    mounted () {
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$events.on(EventTypes.GO_BACK, this.clearSelection);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.GO_BACK, this.clearSelection);
    },

    methods: {
      onSelect (center) {
        if (center.selected) {
          this.selected.push(center);
        } else {
          this.selected = this.selected.filter(s => s.id !== center.id);
        }
        this.$emit('onSelect', this.selected);
      },

      clearSelection () {
        this.selected = [];
        this.centers.map((center) => { center.selected = false });
        this.$emit('onSelect', this.selected);
      }
    }
  };
</script>
