<template>
  <div
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      fontWeight: val.fontWeight ? 'bold' : 'normal'
    }"
  >
    <tablulator
      :endpoint="val.endpoint"
      :options="val.options"
      class="no-events"/>
  </div>
</template>

<script>
import params from './params.vue'
import tablulator from './table.vue'

const WIDGET_NAME = 'cs-table'

export default {
  name: WIDGET_NAME,
  components: { tablulator },
  icon: `<svg class="bi bi-table" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path fill-rule="evenodd" d="M15 4H1V3h14v1z"/>
    <path fill-rule="evenodd" d="M5 15.5v-14h1v14H5zm5 0v-14h1v14h-1z"/>
    <path fill-rule="evenodd" d="M15 8H1V7h14v1zm0 4H1v-1h14v1z"/>
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H0V2z"/>
  </svg>`,
  title: 'Table',
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
    title: 'Tabular Data',
    subTitle: '',
    headerEnabled: true,
    padding: 15,
    x: 0,
    y: 0,
    w: 9,
    h: 9,
    endpoint: 'https://jsonplaceholder.typicode.com/users/',
    options: JSON.stringify({'layout': 'fitColumns', 'columns': [{ 'title': 'Name', 'field': 'name', 'sorter': 'string' }, { 'title': 'Email', 'field': 'email', 'sorter': 'number' }]})
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
