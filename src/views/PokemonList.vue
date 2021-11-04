<template>
  <div class="container-list">
    <template v-if="isLoading">
      <loader />
    </template>
    <div class="container" v-else>
      <search-input
        @search-character="searchCharacter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SearchInput } from '@/components/UI'
import { Loader } from '../components/layout'
import { Loading } from '@/store/module'

@Component({
  name: 'PokemonList',
  components: {
    SearchInput,
    Loader
  }
})
export default class PokemonList extends Vue {
  private searchCharacter (e: string): void {
    console.log(e)
  }

  public get isLoading (): boolean {
    return Loading.isLoading
  }
}
</script>
