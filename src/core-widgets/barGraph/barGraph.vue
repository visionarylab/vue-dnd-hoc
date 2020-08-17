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
import 'echarts/lib/chart/bar'

export default {
  name: 'BarPlot',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      option: {
        title: {
          text: 'Sales comparison',
          subtext: 'Product A vs Product B'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Product A', 'Product B']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['1 Month', '2 Month', '3 Month', '4 Month', '5 Month', '6 Month', '7 Month', '8 Month', '9 Month', '10 Month', '11 Month', '12 Month']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Product A',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                {type: 'max', name: 'Min'},
                {type: 'min', name: 'Max'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: 'Average'}
              ]
            }
          },
          {
            name: 'Product B',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [
                {name: 'Product A', value: 182.2, xAxis: 7, yAxis: 183},
                {name: 'Product B', value: 2.3, xAxis: 11, yAxis: 3}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: 'Average'}
              ]
            }
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
