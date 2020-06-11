<template>
  <div>
    <hr>
    <div class="panel-row">
      <vpd-icon name="credit-card" />
      <div class="panel-label">{{ $t('data.names.container') }}</div>
      <div class="panel-value">
        <input
          v-model.trim="activeElement.name"
          type="text"
          placeholder="Container name is required">
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="grid" />
      <div class="panel-label">{{ $t('data.names.display') }}</div>
      <div class="panel-value">
        <select v-model="activeElement.display">
          <option>flex</option>
          <option>block</option>
        </select>
      </div>
    </div>

    <div
      v-show="activeElement.display === 'flex'"
      class="panel-row">
      <vpd-icon name="shuffle" />
      <div class="panel-label">{{ $t('data.direction') }}</div>
      <div class="panel-value">
        <select v-model="activeElement.dir">
          <option>row</option>
          <option>row-reverse</option>
          <option>column</option>
          <option>column-reverse</option>
        </select>
      </div>
    </div>

    <div
      v-show="activeElement.display === 'flex'"
      class="panel-row">
      <vpd-icon name="align-justify" />
      <div class="panel-label">{{ $t('data.names.content') }}</div>
      <div class="panel-value">
        <select v-model="activeElement.justify">
          <option>flex-start</option>
          <option>space-between</option>
          <option>center</option>
          <option>space-around</option>
          <option>flex-end</option>
        </select>
      </div>
    </div>

    <div
      v-show="activeElement.display === 'flex'"
      class="panel-row">
      <vpd-icon name="align-center" />
      <div class="panel-label">{{ $t('data.names.align') }}</div>
      <div class="panel-value">
        <select v-model="activeElement.align">
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
        </select>
      </div>
    </div>

    <hr>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">{{ $t('data.names.backgroundColor') }}</div>
      <div class="panel-value">{{ activeElement.bgColor }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.bgColor"
          type="color">
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="image" />
      <div class="panel-label">{{ $t('data.names.backgroundImage') }}</div>
      <div class="panel-value">
        <div
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }"
          class="panel-preview"
          @click="addPic">
          <vpd-icon
            v-show="!activeElement.backPic"
            name="plus" />
        </div>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="square" />
      <div class="panel-label">{{ $t('data.names.borderRadius') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.radius"
          type="text">
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="maximize" />
      <div class="panel-label">{{ $t('data.names.width') }}</div>
      <div class="panel-value">
        <input
          v-model="activeElement.borderWidth"
          type="text">
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">{{ $t('data.names.borderColor') }}</div>
      <div class="panel-value">{{ activeElement.borderColor }}</div>
      <div>
        <input
          v-model="activeElement.borderColor"
          type="color">
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '../../../src/mixins/vpd'
export default {
  name: 'BraidContainerStyle',
  mixins: [vpd],
  props: ['activeElement'],
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('addContainerBackPic', payload)
      })
    }
  }
}
</script>
