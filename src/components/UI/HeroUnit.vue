<template>
  <div class="hero container">
    <h1>
      {{ title }}
    </h1>
    <p>
      {{ subtitle }}
    </p>
    <action-button
      :active="active"
      @set-action="setAction"
      :iconName="iconName"
    >
      {{ textButton }}
    </action-button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { ActionButton } from '@/components/UI'

@Component({
  name: 'HeroUnit',
  components: {
    ActionButton
  }
})
export default class HeroUnit extends Vue {
  @Prop({ type: String, required: true })
  private title!: string;

  @Prop({ type: String, required: true })
  private subtitle!: string;

  @Prop({ type: String, required: true })
  private textButton!: string;

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
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }

  .hero h1 {
    margin-top: 50px;
  }

  .hero p {
    margin-top: 30px;
    margin-bottom: 50px;
    color: #5E5E5E;
  }

    @media (max-width: 768px) {
    .hero h1 {
      margin-top: 25px;
    }
  }
</style>
