<template>
  <div>

    <div class="panel-row">
      <vpd-icon name="cpu" />
      <div class="panel-label">{{ $t('data.params.options') }}</div>
      <div class="panel-value">
        <textarea
          v-model="text"
          :placeholder="$t('data.params.linkPlaceholder')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mapDynamicFields from '../../utils/field-mapper'

export default {
  name: 'CSButtonParams',
  props: ['activeElement', 'tab'],
  computed: {
    activeElementIndex () {
      return this.$store.state.vdh.widgets.findIndex(widget => widget.uuid === this.activeElement.uuid)
    },
    ...mapDynamicFields('vdh', [
      `widgets[].text`
    ], 'activeElementIndex')
  }
}

</script>
