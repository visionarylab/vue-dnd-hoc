<template>
  <div>

    <div class="panel-row">
      <vpd-icon name="cpu" />
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
  name: 'CSButtonParams',
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  methods: {
    updateText () {
      this.$store.commit('vdh/updateData', {
        uuid: this.activeElement.uuid,
        key: 'text',
        value: this.activeElement.text
      })
    }
  }
}
</script>
