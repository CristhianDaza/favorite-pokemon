<template>
  <div>
    <search-input
      @search-character="searchCharacter"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SearchInput } from '@/components/UI'

@Component({
  name: 'PokemonList',
  components: {
    SearchInput
  }
})
export default class PokemonList extends Vue {
  private searchCharacter (e: string): void {
    console.log(e)
  }
}
</script>
