<template>
  <div class="layout-center">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th
            v-for="colHead in JSON.parse(options).columns"
            :key="colHead.title">{{ colHead.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in tableData"
          :key="row.id">
          <td
            v-for="(val, index) in row"
            :key="index">
            {{ val }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
        this.tableData = this.tableData.map(row => JSON.parse(this.options).columns.map(colName => row[colName.field]))
      })
    }
  }
}
</script>
