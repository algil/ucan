<template>
  <div>
    <!-- SAVE -->
    <v-tooltip bottom>
      <v-btn
        icon
        slot="activator"
        @click="onSave()">
        <v-icon>check</v-icon>
      </v-btn>
      <span>{{ $t('label.save') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'form-actions',

    methods: {
      onSave () {
        this.$events.emit(EventTypes.FORM_ON_SAVE);
      }
    }
  };
</script>
