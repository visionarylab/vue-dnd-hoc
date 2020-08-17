<template>
  <div class="layout-center">
    <v-chart
      :options="option"
      autoresize/>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/gauge'

export default {
  name: 'Gauge',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'Sales Target',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 35, name: 'Sales Target'}]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .layout-center,
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
