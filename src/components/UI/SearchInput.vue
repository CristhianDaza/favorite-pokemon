<template>
<div class="control container">
  <input
    type="text"
    placeholder="Search"
    class="input-icon"
    @input="searchCharacter"
  >
  <span>
    <i class="icon icon-search"></i>
  </span>
</div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component({
  name: 'SearchInput'
})
export default class SearchInput extends Vue {
  @Emit('search-character')
  private searchCharacter (e: { target: { value: string } }): string {
    return e.target.value
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

  .control {
    position: sticky;
    top: 0;
    background: white;
  }

  input {
    width: 100%;
    height: 50px;
    margin-top: 25px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    border-radius: 5px;
    font-size: 20px;
    border: none;
    color: #353535;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    padding-left: 40px;
  }

  input:focus-visible {
    outline: none;
  }

  .icon-search {
    position: absolute;
    top: 39px;
    left: 10px;
  }
</style>
