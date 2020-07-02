<template>
  <div>
    <VueTabulator
      v-model="tableDados"
      :options="checkOptions(options)"
      class="table-striped table-bordered"/>
  </div>
</template>

<script>
export default {
  name: 'Tablulator',
  props: ['options', 'endpoint'],
  data () {
    return {
      tableDados: []
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
    checkOptions (options) {
      if (options) {
        if (options[0] === '[') {
          return {columns: JSON.parse(options)}
        } else {
          return {columns: JSON.parse('[' + options + ']')}
        }
      } else {
        return {columns: [{ 'title': 'Name', 'field': 'name', 'sorter': 'string', 'width': 200 }, { 'title': 'Email', 'field': 'email', 'sorter': 'number', 'width': 200 }]}
      }
    },
    fetchData () {
      let url = 'https://jsonplaceholder.typicode.com/users/4'
      fetch(this.endpoint || url).then(res => res.json()).then(data => {
        if (data.length) { // if data is an object only and not an array. i.e, a single element
          this.tableDados = data
        } else { // if data is an array of objects
          this.tableDados = []
          this.tableDados.push(data)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
