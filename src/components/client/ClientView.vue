<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 v-if="true">
        <client-view-form :client="client" @save="save"></client-view-form>
      </v-flex>
      <v-flex xs12 v-if="true">
        <client-view-pets :pets="client.pets"></client-view-pets>
      </v-flex>
      <v-flex xs12 v-if="true">
        <client-view-activity :pets="client.pets"></client-view-activity>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ClientViewForm from './ClientViewForm';
  import ClientViewPets from './ClientViewPets';
  import ClientViewActivity from './ClientViewActivity';

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    components: {
      ClientViewForm,
      ClientViewPets,
      ClientViewActivity
    },

    data () {
      return {
        client: {},
        isEditMode: false
      };
    },

    mounted () {
      this.init();
      // this.$store.commit('showCancel', true);
    },

    beforeDestroy () {
      // this.$store.commit('showCancel', false);
    },

    methods: {
      init () {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadClient();
        } else {
          this.$store.commit('title', this.$t('client.titleNew'));
          this.client = {};
        }
      },

      async loadClient () {
        this.client = await this.$store.dispatch('clients/get', this.id);
        this.$store.commit('title', `'${this.client.name}'`);
      },

      async save (client) {
        await this.$store.dispatch('clients/save', client);
        this.$snackBar.success(this.$t('client.saveSuccess'));
        if (!this.isEditMode) {
          this.$router.push({name: 'ClientView', params: {id: client.id}});
        }
      }
    }
  };
</script>
