<template>
  <v-list two-line>
    <template v-for="(service, index) in services">
      <v-list-tile avatar>
        <v-list-tile-action>
          <v-checkbox
            v-model="service.selected"
            @change="onSelect(service)">
          </v-checkbox>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{service.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{service.cost}} €</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-show="index !== services.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script>
  import ServiceListActions from './ServiceListActions';

  export default {
    name: 'service-list-mobile',

    components: {
      ServiceListActions
    },

    props: {
      services: {
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
    },

    methods: {
      add () {
        this.$router.push({name: 'ServiceItem', params: {id: 'new'}});
      },

      onSelect (service) {
        if (service.selected) {
          this.selected.push(service);
        } else {
          this.selected = this.selected.filter(s => s.id !== service.id);
        }
        this.$emit('onSelect', this.selected);
      }
    }
  };
</script>
