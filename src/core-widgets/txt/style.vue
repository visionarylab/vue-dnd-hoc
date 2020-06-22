<template>
  <div>
    <hr>
    <div
      class="panel-row"
      flex
    >
      <vpd-icon name="sliders" />
      <div class="panel-label">{{ $t('data.names.lineHeight') }}</div>
      <div class="panel-value">
        {{ activeElement.lineHeight }}
      </div>
      <div class="panel-slider-wrap">
        <vpd-slider
          :max="5"
          :min="1"
          v-model="activeElement.lineHeight"
        />
      </div>
    </div>

    <div
      class="panel-row"
      flex
    >
      <vpd-icon name="type" />
      <div class="panel-label">{{ $t('data.names.fontSize') }}</div>
      <div class="panel-value">
        {{ activeElement.fontSize }}rem
      </div>
      <div class="panel-slider-wrap">
        <vpd-slider
          :step="0.01"
          :max="2"
          :min=".85"
          v-model="activeElement.fontSize"
        />
      </div>
    </div>

    <div
      class="panel-row"
      flex
    >
      <vpd-icon name="edit-3" />
      <div class="panel-label">{{ $t('data.names.textColor') }}</div>
      <div class="panel-value">
        {{ activeElement.color }}
      </div>
      <div>
        <input
          v-model="activeElement.color"
          type="color"
        >
      </div>
    </div>

    <div
      class="panel-row"
      flex
    >
      <vpd-icon name="bold" />
      <div class="panel-label">{{ $t('data.names.bold') }}</div>
      <div class="panel-value">
        <label class="form-switch">
          <input
            v-model="activeElement.fontWeight"
            type="checkbox"
          >
          <i class="form-icon"/>
        </label>
      </div>
    </div>

    <div
      class="panel-row"
      flex
    >
      <vpd-icon name="align-justify" />
      <div class="panel-label">{{ $t('data.names.align') }}</div>
      <div class="panel-value">
        <label
          :data-tooltip="getToolTipName('left')"
          class="form-radio tooltip"
        >
          <input
            v-model="activeElement.textAlign"
            type="radio"
            name="align"
            value="left"
          >
          <i class="form-icon"/>
          <vpd-icon name="align-left" />
        </label>
        <label
          :data-tooltip="getToolTipName('center')"
          class="form-radio tooltip"
        >
          <input
            v-model="activeElement.textAlign"
            type="radio"
            name="align"
            value="center"
          >
          <i class="form-icon"/>
          <vpd-icon name="align-center" />
        </label>
        <label
          :data-tooltip="getToolTipName('right')"
          class="form-radio tooltip"
        >
          <input
            v-model="activeElement.textAlign"
            type="radio"
            name="align"
            value="right"
          >
          <i class="form-icon"/>
          <vpd-icon name="align-right" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CSTxtStyle',
  props: ['activeElement'],
  methods: {
    getToolTipName (name) {
      return this.$t('data.names.' + name)
    }
  }
};
</script>
