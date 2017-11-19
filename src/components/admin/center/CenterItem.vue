<template>
  <div>
    <!-- DESKTOP -->
    <v-card
      v-if="!isMobile"
      class="card--flex-toolbar">

      <!-- TOOLBAR -->
      <v-toolbar
        card
        color="white"
        prominent>

        <v-tooltip bottom>
          <v-btn
            icon
            slot="activator"
            @click.stop="navigateToCenterList">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>{{ $t('label.back') }}</span>
        </v-tooltip>

        <v-toolbar-title class="body-2 grey--text">
          {{$store.state.title}}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <center-item-actions></center-item-actions>
      </v-toolbar>
      <v-divider></v-divider>

      <!-- FORM -->
      <center-item-form :center="center"></center-item-form>
    </v-card>

    <!-- MOBILE -->
    <center-item-form
      v-if="isMobile"
      :center="center">
    </center-item-form>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import CenterItemActions from './CenterItemActions';
  import CenterItemForm from './CenterItemForm';

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    components: {
      CenterItemActions,
      CenterItemForm
    },

    data () {
      return {
        center: {
          active: true
        },
        isEditMode: false
      };
    },

    mounted () {
      this.init();
      if (this.isMobile) {
        this.$store.commit('showBack', true);
      }
      this.$events.on(EventTypes.GO_BACK, this.navigateToCenterList);
      this.$events.on(EventTypes.CENTER_ON_SAVE, this.save);
      this.$events.on(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },

    beforeDestroy () {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToCenterList);
      this.$events.off(EventTypes.CENTER_ON_SAVE, this.save);
      this.$events.off(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },

    methods: {
      init () {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadCenter();
        } else {
          this.$store.commit('title', this.$t('center.titleNew'));
        }
      },
      async loadCenter () {
        this.center = await this.$store.dispatch('centers/get', this.id);
        this.$store.commit('title', `'${this.center.name}'`);
      },
      async save () {
        this.$events.emit(EventTypes.VALIDATE);
        if (!this.errors.any()) {
          await this.$store.dispatch('centers/save', this.center);
          this.$snackBar.success(this.$t('center.saveSuccess'));
          this.navigateToCenterList();
        }
      },
      navigateToCenterList () {
        this.$router.push({name: 'CenterList'});
      },
      refreshErrors (errors) {
        this.errors.clear();
        errors.forEach(({field, msg, rule, scope}) => {
          this.errors.add(field, msg, rule, scope);
        });
      }
    }
  };
</script>
