<template>
  <div class="layout-center">
    <!-- <VueTabulator
      v-model="tableData"
      :options="options"
      class="table-striped table-bordered"/> -->
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Genre</th>
          <th>Release date</th>
        </tr>
      </thead>
      <tbody>
        <tr class="active">
          <td>The Shawshank Redemption</td>
          <td>Crime, Drama</td>
          <td>14 October 1994</td>
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
      })
    }
  }
}
</script>
