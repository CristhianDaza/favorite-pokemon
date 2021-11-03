<template>
  <div class="container">
    <hero-image />
    <hero-unit
      :title="title"
      :subtitle="subtitle"
      :textButton="textButton"
      :active="true"
      @set-action="startApplication"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { HeroUnit } from '../components/UI'
import HeroImage from '../components/home/HeroImage.vue'

@Component({
  components: {
    HeroUnit,
    HeroImage
  }
})
export default class Home extends Vue {
  private title = 'Welcome to Pokédex';

  private subtitle = 'The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.';

  private textButton = 'Get started';

  private startApplication (): void {
    console.log('click')
  }
}
</script>
