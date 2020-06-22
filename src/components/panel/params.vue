<template>
  <div
    v-if="tab === 2"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <vpd-icon name="type" />
      <div class="panel-label">{{ $t('data.params.name') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.name"
          type="text">
      </div>
    </div>
    <component
      v-for="(item, i) in widgetParams"
      :is="widgetParams[i]"
      :key="i"
      :active-element="activeElement" />
  </div>
</template>

<script>
import widget from '../../plugins/widget'

export default {
  name: 'PanelParams',
  props: ['activeElement', 'tab'],
  data () {
    return {}
  },
  computed: {
    widgetParams () {
      return widget.getWidgetParams(this.activeElement)
    }
  }
}
</script>
