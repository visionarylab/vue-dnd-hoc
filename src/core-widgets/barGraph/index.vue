<template>
  <div
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      fontWeight: val.fontWeight ? 'bold' : 'normal'
    }"
  >
    <barGraph
      :endpoint="val.endpoint"
      :json-data="val.jsonData"
      :id="val.uuid"
      class="no-events"/>
  </div>
</template>

<script>
import params from './params.vue'
import barGraph from './barGraph.vue'

const WIDGET_NAME = 'cs-barGraph'

export default {
  name: WIDGET_NAME,
  components: { barGraph },
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>`,
  title: 'BarGraph',
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
    title: 'Bar Plot',
    subTitle: '',
    headerEnabled: true,
    padding: 15,
    x: 0,
    y: 0,
    w: 9,
    h: 9,
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
    }
  }
}
</script>

<style scoped>
  .no-events {
    pointer-events:none;
  }
</style>
