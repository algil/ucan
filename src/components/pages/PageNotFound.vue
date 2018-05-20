<template>
  <v-content>
    <v-container fill-height>
      <v-flex class="text-xs-center">
        <h1 class="display-3 grey--text text--darken-1">{{ $t('pages.notFound.title') }}</h1>
        <p class="headline grey--text text--darken-1">{{ $t('pages.notFound.message') }}</p>
        <v-btn dark primary :to="{name: 'Home'}">
          {{ $t('pages.notFound.action') }}
        </v-btn>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
export default {
}
</script>
