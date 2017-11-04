<template>
  <div>
    <!-- EDIT -->
    <v-tooltip bottom v-show="selected.length === 1">
      <v-btn icon slot="activator" @click="edit()">
        <v-icon>mode_edit</v-icon>
      </v-btn>
      <span>Editar</span>
    </v-tooltip>

    <!-- REMOVE -->
    <v-tooltip bottom v-show="selected.length > 0">
      <v-btn icon slot="activator" @click="remove()">
        <v-icon>delete</v-icon>
      </v-btn>
      <span>Eliminar</span>
    </v-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'service-list-actions',
    data() {
      return {
        selected: []
      }
    },
    created() {
      console.log('ServiceListActions Created');
    },
    mounted() {
      console.log('ServiceListActions Mounted', this._uid);
      this.$events.on('service-list-selection-changed', (value) => {
        console.log('on service-list-selection-changed', value);
        this.selected = value;
      });
    },
    beforeDestroy() {
      console.log('ServiceListActions BeforeDestroy', this._uid);
      this.$events.off('service-list-selection-changed');
      console.log(this.$events);
    },
    methods: {
      edit() {
        this.$router.push({name: 'service-item', params: {id: this.selected[0].id}});
      },
      async remove() {
        // TODO: Show confirmation dialog
        // TODO: If confirm, delete selected services
        await this.$store.dispatch('services/remove', this.selected);
        this.notifyChanges();
      },
      notifyChanges() {
        this.$events.emit('service-list-changed');
      }
    }
  }
</script>
