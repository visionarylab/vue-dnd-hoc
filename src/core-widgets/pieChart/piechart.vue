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
import 'echarts/lib/chart/pie'

export default {
  name: 'PieChart',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      option: {
        title: {
          text: 'Savings Distribution',
          subtext: 'in Rupees',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Accessories', 'Equipment', 'Loans', 'Others', 'Professional Services']
        },
        series: [
          {
            name: 'PieChart',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: 'Accessories'},
              {value: 310, name: 'Equipment'},
              {value: 234, name: 'Loans'},
              {value: 135, name: 'Others'},
              {value: 1548, name: 'Professional Services'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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
