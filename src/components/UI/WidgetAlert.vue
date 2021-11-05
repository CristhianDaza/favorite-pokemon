<template>
  <div class="widget-alert">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'WidgetAlert'
})
export default class WidgetAlert extends Vue {
  @Prop({ type: String, required: true })
  private message!: string
}
</script>

<style scoped>
  .widget-alert {
    position: fixed;
    top: 30px;
    right: 50px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 20px;
    text-align: center;
    box-shadow: 10px 10px 18px -9px rgba(0,0,0,0.7);
  }

  .widget-alert p {
    font-size: 16px;
  }
</style>
