<template>
  <div class="pokemon-list-container">
    <template v-if="isLoading">
      <loader />
    </template>
    <div v-else>
      <search-input
        @search-character="searchCharacter"
      />
      <template v-if="getPokemon.length > 0">
        <div class="container container-list">
          <list-item
            v-for="(pokemon, i) in getPokemon"
            :key="i"
            :favorite="pokemon.favorite"
            :pokemon="pokemon"
            @set-favorite="setFavorite"
            @show-pokemon="showPokemon"
          />
        </div>
        <footer-buttons />
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
    <detail-modal
      v-if="showModal"
      @close-modal="closeModal"
      :pokemon="infoPokemon"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  SearchInput,
  HeroUnit,
  ListItem,
  FooterButtons,
  DetailModal
} from '@/components/UI'
import { Loader } from '../components/layout'
import { Loading, Pokemon } from '@/store/module'
import { pokemonInfo, pokemonResult } from '@/typings'

@Component({
  name: 'PokemonList',
  components: {
    SearchInput,
    Loader,
    HeroUnit,
    ListItem,
    FooterButtons,
    DetailModal
  }
})
export default class PokemonList extends Vue {
  private title = 'Uh-oh!';

  private subtitle = 'You look lost on your journey!';

  private textButton = 'Go back home';

  private search = '';

  private showModal = false

  async created (): Promise<void> {
    if (this.getPokemon.length === 0) {
      await Pokemon.getPokemon()
    }
  }

  private searchCharacter (e: string): void {
    this.search = e
    Pokemon.filterByName(e)
  }

  private goBack (): void {
    this.$router.push({ name: 'Home' })
  }

  public get isLoading (): boolean {
    return Loading.IsLoading
  }

  public get getPokemon (): pokemonResult[] {
    return Pokemon.filterByName(this.search)
  }

  public get infoPokemon ():pokemonInfo[] {
    return Pokemon.InfoPokemon
  }

  private setFavorite (name: string) {
    Pokemon.getFavorite(name)
  }

  private async showPokemon (pokemon:pokemonResult) {
    await Pokemon.getInfoPokemon(pokemon)
    this.showModal = true
  }

  private closeModal () {
    this.showModal = false
    Pokemon.cleanModal()
  }
}
</script>

<style scoped>
  .pokemon-list-container{
    position: relative;
  }

  .container-list {
    margin-top: 20px;
    min-height: calc(100vh - 170px);
  }
</style>
