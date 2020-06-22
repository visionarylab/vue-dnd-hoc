<template>
  <div>

    <div class="panel-row">
      <div class="panel-label">{{ $t('data.params.options') }}</div>
      <div class="panel-value">
        <textarea
          v-model="activeElement.text"
          :placeholder="$t('data.params.linkPlaceholder')"
          @blur="(e) => updateText()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '../../../src/mixins/vpd'

export default {
  name: 'CSTxtParams',
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  computed: {
    widgetStore () {
      return this.$vpd.state.widgets.filter(item => item.belong === 'page')
    }
  },
  methods: {
    updateText () {
      this.$vpd.commit('updateData', {
        uuid: this.activeElement.uuid,
        key: 'text',
        value: this.activeElement.text
      })
    }
  }
}
</script>
