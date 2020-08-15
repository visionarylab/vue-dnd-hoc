import csTable from './table/index.vue'
import csBarGraph from './barGraph/index.vue'
import csPieChart from './pieChart/index.vue'
import csGauge from './gauge/index.vue'

export default {
  [csTable.name]: csTable,
  [csBarGraph.name]: csBarGraph,
  [csPieChart.name]: csPieChart,
  [csGauge.name]: csGauge
}
