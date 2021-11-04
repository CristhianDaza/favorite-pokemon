<template>
  <div class="container-list">
    <template v-if="isLoading">
      <loader />
    </template>
    <div class="container" v-else>
      <search-input
        @search-character="searchCharacter"
      />
      <template v-if="getPokemon">
        <div class="container-list">
          <list-item
            v-for="(pokemon, i) in getPokemon"
            :key="i"
            :name="pokemon.name"
            :favorite="pokemon.favorite"
            @set-favorite="setFavorite"
          />
        </div>
      </template>
      <template v-else>
        <hero-unit
          :title="title"
          :subtitle="subtitle"
          :textButton="textButton"
          :active="true"
          @set-action="goBack"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SearchInput, HeroUnit, ListItem } from '@/components/UI'
import { Loader } from '../components/layout'
import { Loading, Pokemon } from '@/store/module'
import { pokemonResult } from '@/typings'

@Component({
  name: 'PokemonList',
  components: {
    SearchInput,
    Loader,
    HeroUnit,
    ListItem
  }
})
export default class PokemonList extends Vue {
  private title = 'Uh-oh!';

  private subtitle = 'You look lost on your journey!';

  private textButton = 'Go back home';

  async created (): Promise<void> {
    if (this.getPokemon.length === 0) {
      await Pokemon.getPokemon()
    }
    console.log(this.getPokemon)
  }

  private searchCharacter (e: string): void {
    console.log(e)
  }

  private goBack (): void {
    this.$router.push({ name: 'Home' })
  }

  public get isLoading (): boolean {
    return Loading.isLoading
  }

  public get getPokemon (): pokemonResult[] {
    return Pokemon.pokemonList
  }

  private setFavorite (name: string) {
    Pokemon.getFavorite(name)
  }
}
</script>

<style scoped>
  .container-list {
    margin-top: 20px;
  }
</style>
