<template>
  <div class="containerImageHero">
    <img :src="require('@/assets/img/heroImg.png')" alt="Circle Hero">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'HeroImage'
})
export default class HeroImage extends Vue {
}
</script>

<style scoped>
  .containerImageHero {
    position: relative;
    height: 350px;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .containerImageHero img {
    width: 330px;
  }

  @media (max-width: 768px) {
    .containerImageHero {
      margin-top: 0;
      height: 280px;
    }

    .containerImageHero img {
      max-width: 250px;
    }
}
</style>
