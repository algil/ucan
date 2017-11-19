<template>
  <v-dialog
    v-model="showDialog"
    :persistent="modal"
    max-width="500px">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="(button, index) in buttons"
          flat
          :key="index"
          @click.stop="handler(button.action)">
          {{button.title}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const ESC_KEY_CODE = 27;

  export default {
    data () {
      return {
        showDialog: false,
        title: '',
        message: '',
        modal: true,
        buttons: [],
        defaultButtons: [
          {title: this.$t('label.close'), action: this.hide}
        ]
      };
    },

    mounted () {
      document.addEventListener('keydown', (event) => {
        if (this.showDialog && event.keyCode === ESC_KEY_CODE) {
          this.hide();
        }
      });
      this.$events.on('show-dialog', this.show);
      this.$events.on('hide-dialog', this.hide);
    },

    beforeDestroy () {
      this.$events.off('show-dialog', this.show);
      this.$events.off('hide-dialog', this.hide);
    },

    methods: {
      show (params) {
        this.title = params.title;
        this.message = params.message;
        this.buttons = params.buttons || this.defaultButtons;
        this.showDialog = true;
      },
      hide () {
        this.showDialog = false;
      },
      handler (action) {
        if (action) {
          action();
        }
        this.hide();
      }
    }
  };
</script>
