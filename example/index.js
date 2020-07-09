import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import vuePageDesigner from '../src'

Vue.use(vuePageDesigner)
Vue.use(Vuex)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  store: new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
})
