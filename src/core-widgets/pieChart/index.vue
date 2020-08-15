<template>
  <div
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      fontWeight: val.fontWeight ? 'bold' : 'normal'
    }"
  >
    <piechart
      :endpoint="val.endpoint"
      :options="val.options"
      :id="val.uuid"
      class="no-events"/>
  </div>
</template>

<script>
import params from './params'
import piechart from './piechart.vue'

const WIDGET_NAME = 'cs-pieChart'

export default {
  name: WIDGET_NAME,
  components: { piechart },
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart">
  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
  <path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`,
  title: 'PieChart',
  panel: { 'params': params },
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 98,
    height: 95,
    left: 1,
    top: 1,
    z: 0,
    lineHeight: 1.6,
    fontSize: 0.4,
    fullScreen: true,
    refresh: true,
    fontWeight: false,
    color: '#000000',
    textAlign: 'left',
    text: 'Text',
    href: '',
    belong: 'page',
    animationName: '',
    autoResize: true,
    resizableRows: true,
    title: 'Pie Chart',
    subTitle: '',
    headerEnabled: true,
    padding: 15,
    x: 0,
    y: 0,
    w: 6,
    h: 11,
    endpoint: 'https://jsonplaceholder.typicode.com/users/',
    options: ''
  },
  props: ['val', 'h', 'w', 'playState'],
  methods: {
    rowClicked (e, row) {
      this.$store.commit('vdh/updateData', {
        uuid: this.val.uuid,
        key: 'selectedRow',
        value: this.val.selectedRow
      });
    },
    processOptions (options) {
      if (options[0] === '[') {
        return {columns: JSON.parse(options)}
      } else {
        return {columns: JSON.parse('[' + options + ']')}
      }
    }
  }
}
</script>

<style scoped>
  .no-events {
    pointer-events:none;
  }
</style>
