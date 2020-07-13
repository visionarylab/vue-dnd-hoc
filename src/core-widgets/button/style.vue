<template>
  <div>
    <hr>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">{{ $t('data.names.backgroundColor') }}</div>
      <div class="panel-value">{{ bgColor }}</div>
      <div class="panel-value">
        <input
          v-model="bgColor"
          type="color">
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">{{ $t('data.names.textColor') }}</div>
      <div class="panel-value">{{ color }}</div>
      <div>
        <input
          v-model="color"
          type="color">
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '../../../src/mixins/vpd'
import mapDynamicFields from '../../utils/field-mapper'

export default {
  name: 'CSButtonStyle',
  mixins: [vpd],
  props: ['activeElement'],
  computed: {
    activeElementIndex () {
      return this.$store.state.vdh.widgets.findIndex(widget => widget.uuid === this.activeElement.uuid)
    },
    ...mapDynamicFields('vdh', [
      `widgets[].bgColor`,
      `widgets[].color`
    ], 'activeElementIndex')
  },
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$store.commit('vdh/addBackPic', payload)
      })
    }
  }
}
</script>
