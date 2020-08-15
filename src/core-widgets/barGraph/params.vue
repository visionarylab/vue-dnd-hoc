<template>
  <div>
    <div class="panel-row">
      <vpd-icon name="cpu" />
      <div class="panel-label">{{ $t('data.params.options') }}</div>
      <div class="panel-value">
        <textarea
          v-model="options"
          :placeholder="$t('data.params.optionsPlaceholder')"
          :style="{
            height: (options? Math.ceil(options.length/10*13) : 26) + 'px',
            minHeight: 25 + 'px'
          }"
        />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="link-2" />
      <div class="panel-label">{{ $t('data.params.endpoint') }}</div>
      <div class="panel-value">
        <textarea
          v-model="endpoint"
          :placeholder="$t('data.events.linkPlaceholder')"
          :style="{
            height: (endpoint? Math.ceil(endpoint.length/10*13) : 26) + 'px',
            minHeight: 25 + 'px',
            marginTop: 6 + 'px'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mapDynamicFields from '../../utils/field-mapper'

export default {
  name: 'BarGraphParams',
  props: ['activeElement', 'tab'],
  computed: {
    activeElementIndex () {
      return this.$store.state.vdh.widgets.findIndex(widget => widget.uuid === this.activeElement.uuid)
    },
    ...mapDynamicFields('vdh', [
      `widgets[].endpoint`,
      `widgets[].options`
    ], 'activeElementIndex')
  }
}
</script>
<style scoped>
.panel-row {
  display: grid;
  font-size: 13px;
  line-height: 36px;
  grid-template-columns: auto auto auto;
}
</style>
