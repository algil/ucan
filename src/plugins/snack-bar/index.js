import SnackBarComponent from './SnackBar.vue'

const SnackBarPlugin = {
  install (Vue, options) {
    if (this.installed) {
      return
    }
    this.installed = true
    this.instance = new Vue()

    Vue.prototype.$snackBar = {
      success (text, options = {}) {
        options.color = 'success'
        this.show(text, options)
      },

      info (text, options = {}) {
        options.color = 'info'
        this.show(text, options)
      },

      warning (text, options = {}) {
        options.color = 'warning'
        this.show(text, options)
      },

      error (text, options = {}) {
        options.color = 'error'
        this.show(text, options)
      },

      show (text, options) {
        SnackBarPlugin.instance.$events.emit('show-snack-bar', text, options)
      },

      hide () {
        SnackBarPlugin.instance.$events.emit('hide-snack-bar')
      }
    }

    Vue.component('app-snack-bar', SnackBarComponent)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SnackBarPlugin)
}

export default SnackBarPlugin
