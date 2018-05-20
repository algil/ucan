<template>
  <v-snackbar
    :timeout="options.timeout"
    :color="options.color"
    :multi-line="options.mode === 'multi-line'"
    :vertical="options.mode === 'vertical'"
    v-model="showSnackBar">
    {{ text }}

    <v-btn
      v-if="options.buttonText"
      dark
      flat
      color="primary"
      @click.native="handler(options.buttonAction)">
      {{options.buttonText}}
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      showSnackBar: false,
      text: '',
      options: {},
      defaultOptions: {
        buttonText: null,
        buttonAction: null,
        timeout: 6000,
        color: null,
        mode: 'multi-line'
      }
    }
  },

  mounted () {
    this.$events.on('show-snack-bar', this.show)
    this.$events.on('hide-snack-bar', this.hide)
  },

  beforeDestroy () {
    this.$events.off('show-snack-bar', this.show)
    this.$events.off('hide-snack-bar', this.hide)
  },

  methods: {
    show (text, options) {
      this.text = text
      this.options = Object.assign({}, this.defaultOptions, options)
      this.showSnackBar = true
    },
    hide () {
      this.showSnackBar = false
    },
    handler () {
      if (this.options.buttonAction) {
        this.options.buttonAction()
      }
      this.hide()
    }
  }
}
</script>
