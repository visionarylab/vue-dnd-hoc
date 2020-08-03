<template>
  <div>
    <VueTabulator
      v-model="tableData"
      :options="options"
      class="table-striped table-bordered"/>
  </div>
</template>

<script>
import Vue from 'vue'

import VueTabulator from 'vue-tabulator';
Vue.use(VueTabulator);

export default {
  name: 'Tablulator',
  props: ['options', 'endpoint'],
  data () {
    return {
      tableData: []
    }
  },
  watch: {
    endpoint: function () {
      this.fetchData()
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      fetch(this.endpoint).then(res => res.json()).then(data => {
        if (data.length) { // if data is an object only and not an array. i.e, a single element
          this.tableData = data
        } else { // if data is an array of objects
          this.tableData = []
          this.tableData.push(data)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import  "~vue-tabulator/dist/scss/tabulator_modern";
</style>
