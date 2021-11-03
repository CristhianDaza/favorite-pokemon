<template>
  <button
    class="action-button"
    :class="active ? 'active' : 'disabled'"
    @click="setAction"
    :disabled="!active"
  >
    <i
      v-if="iconName"
      class="icon"
      :class="`icon-${iconName}`"
    ></i>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Prop,
  Vue
} from 'vue-property-decorator'

@Component({
  name: 'ActionsButton'
})
export default class ActionsButton extends Vue {
  @Prop({ type: Boolean, required: true })
  private active!: boolean;

  @Prop({ type: String, required: false })
  private iconName!: string;

  @Emit('set-action')
  private setAction (): boolean {
    return true
  }
}
</script>

<style scoped>
  .action-button {
    color: white;
    border-radius: 60px;
    padding: 10px 20px;
    cursor: pointer;
    outline: none;
    border-color: transparent;
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .action-button.active {
    background-color: #F22539;
    transition: all .2s ease;
  }

  .action-button.active:active {
    background-color: #C00E20;
  }

  .action-button.disabled {
    background-color: #BFBFBF;
    cursor: auto;
  }

  .action-button i {
    margin-right: 5px;
  }
</style>
