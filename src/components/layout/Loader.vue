<template>
  <div class="loader">
    <img src="@/assets/img/pokemon/loader.png" alt="Loader">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Loader'
})
export default class Loader extends Vue {}
</script>

<style scoped>
.loader {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader img {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
