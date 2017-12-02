<template>
  <div>
    <!-- EDIT -->
    <v-tooltip
      bottom
      v-show="selected.length === 1">
      <v-btn
        icon
        slot="activator"
        @click="onEdit()">
        <v-icon>mode_edit</v-icon>
      </v-btn>
      <span>{{ $t('label.edit') }}</span>
    </v-tooltip>

    <!-- REMOVE -->
    <v-tooltip
      bottom
      v-show="selected.length > 0">
      <v-btn
        icon
        slot="activator"
        @click="showDeleteConfirmation()">
        <v-icon>delete</v-icon>
      </v-btn>
      <span>{{ $t('label.delete') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'service-actions',

    data () {
      return {
        selected: []
      };
    },

    computed: {
      serviceLabel () {
        return this.selected.length === 1 ? this.selected[0].name : this.selected.length;
      }
    },

    mounted () {
      this.$events.on(EventTypes.SERVICE_LIST_ON_SELECT, this.onSelectionChange);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.SERVICE_LIST_ON_SELECT, this.onSelectionChange);
    },

    methods: {
      onEdit () {
        this.$events.emit(EventTypes.SERVICE_LIST_ON_EDIT);
      },
      showDeleteConfirmation () {
        this.$dialog.show({
          title: this.$tc('service.deleteDialog.title', this.selected.length, {value: this.serviceLabel}),
          message: this.$tc('service.deleteDialog.message', this.selected.length, {name: this.selected.length}),
          buttons: [
            {title: this.$t('label.delete'), action: this.onRemove},
            {title: this.$t('label.cancel')}
          ]
        });
      },
      onRemove () {
        this.$events.emit(EventTypes.SERVICE_LIST_DELETE);
      },
      onSelectionChange (selected) {
        this.selected = selected;
      }
    }
  };
</script>
