import Vue from 'vue'

class EventBus {
  constructor () {
    this.vm = new Vue({
      data: {}
    })
  }

  $emit (event, ...args) {
    return this.vm.$emit(event, ...args)
  }

  $on (event, callback) {
    return this.vm.$on(event, callback)
  }
}

export default new EventBus()
