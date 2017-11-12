<template>
  <v-dialog v-model="showDialog" :persistent="persistent" max-width="500px">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.stop="onAction">{{actionText}}</v-btn>
        <v-btn color="primary" flat @click.stop="close">{{cancelText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const ENTER_KEY_CODE = 13;

  export default {
//    props: {
//      show: {
//        required: true
//      },
//      title: {
//        type: String,
//        required: true
//      },
//      message: {
//        type: String,
//        required: true
//      },
//      onAction: {
//        type: Function,
//        required: true
//      },
//      cancelText: {
//        type: String,
//        default: 'Cancelar'
//      },
//      actionText: {
//        type: String,
//        default: 'Ok'
//      },
//      persistent: {
//        type: Boolean,
//        default: true
//      }
//    },
    data() {
      return {
        showDialog: false,
        title: '',
        message: ''
      }
    },
    mounted: function () {
      document.addEventListener('keydown', (event) => {
        if (this.showDialog && event.keyCode === ENTER_KEY_CODE) {
          this.close();
        }
      });
    },
    watch: {
      show() {
        console.log('watch show:', this.show);
        this.showDialog = this.show;
      }
    },
    methods: {
      close() {
        console.log('close showDialog:', this.showDialog);
        this.showDialog = false;
      }
    }
  }
</script>
