<template>
  <v-card>
    <v-toolbar card color="white" prominent>
      <v-icon>history</v-icon>
      <v-toolbar-title class="grey--text">
        {{ $t('client.activity.title') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <v-btn icon slot="activator">
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{ $t('label.newActivity') }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider></v-divider>

    <v-card-text v-show="!activities" class="text-xs-center grey--text text--darken-1">
      <p>{{ $t('client.activity.noData') }}</p>
    </v-card-text>
    <v-card-text v-show="activities">
      <!-- TODO: Add data table with activity -->
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'client-view-activity',

    props: {
      activities: {
        required: false,
        type: Array
      }
    }
  };
</script>
