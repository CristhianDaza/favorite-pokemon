import { getModule, Module, Mutation, VuexModule, config, Action } from 'vuex-module-decorators'
import store from '@/store'
import { getPokemonApi } from '@/api/getPokemonApi'
import { pokemonInfo, pokemonResult } from '@/typings'
import { Loading } from '@/store/module'

config.rawError = true

@Module({
  name: 'pokemonStore',
  namespaced: true,
  dynamic: true,
  store
})

class PokemonStore extends VuexModule {
  public pokemonList:pokemonResult[] = []
  public buttonAllActive = true
  public buttonFavoriteActive = false
  public favoritePokemon:pokemonResult[] = []
  public infoPokemon:pokemonInfo[] = []
  public allPokemons:pokemonResult[] = []

  get PokemonList () {
    return this.pokemonList
  }

  get ButtonAllActive () {
    return this.buttonAllActive
  }

  get ButtonFavoriteActive () {
    return this.buttonFavoriteActive
  }

  get FavoritePokemon () {
    return this.favoritePokemon
  }

  get filterByName () {
    return (search: string): pokemonResult[] => {
      return this.pokemonList.filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    }
  }

  get InfoPokemon (): pokemonInfo[] {
    return this.infoPokemon
  }

  @Mutation
  SET_POKEMON (payload: pokemonResult[]): void {
    this.pokemonList = payload
  }

  @Mutation
  CHANGE_ACTIVE_ALL (payload: boolean): void {
    this.buttonAllActive = payload
  }

  @Mutation
  CHANGE_ACTIVE_FAVORITE (payload: boolean): void {
    this.buttonFavoriteActive = payload
  }

  @Mutation
  SET_FAVORITE_POKEMON (payload: pokemonResult[]): void {
    this.favoritePokemon = payload
  }

  @Mutation
  SET_INFO_POKEMON (payload:pokemonInfo[]): void {
    this.infoPokemon = payload
  }

  @Mutation
  SET_ALL_POKEMONS (payload: pokemonResult[]): void {
    this.allPokemons = payload
  }

  @Action({ commit: 'SET_POKEMON' })
  async getPokemon () {
    Loading.SET_LOADING(true)
    let result:pokemonResult[] = []
    const url = 'https://pokeapi.co/api/v2/pokemon'

    await getPokemonApi(url)
      .then(({ data }) => {
        data.results.forEach((pokemon: pokemonResult) => {
          pokemon.favorite = false
          result.push(pokemon)
        })
      })
      .catch(() => {
        result = []
      })
    this.context.commit('SET_ALL_POKEMONS', result)
    Loading.SET_LOADING(false)
    return result
  }

  @Action({ commit: 'SET_POKEMON' })
  getFavorite (name: string) {
    this.pokemonList.forEach(pokemon => {
      if (pokemon.name === name) {
        if (pokemon.favorite === false) {
          pokemon.favorite = true
          this.context.commit('SET_FAVORITE_POKEMON', [...this.favoritePokemon, pokemon])
        } else {
          pokemon.favorite = false
          const filter = this.favoritePokemon.filter(({ name }) => name !== pokemon.name)
          this.context.commit('SET_FAVORITE_POKEMON', filter)
        }
      }
    })
    return this.pokemonList
  }

  @Action({ commit: 'SET_POKEMON' })
  async getAllPokemons () {
    this.context.commit('CHANGE_ACTIVE_ALL', true)
    this.context.commit('CHANGE_ACTIVE_FAVORITE', false)
    return this.allPokemons
  }

  @Action({ commit: 'SET_POKEMON' })
  getFavoritePokemon () {
    this.context.commit('CHANGE_ACTIVE_ALL', false)
    this.context.commit('CHANGE_ACTIVE_FAVORITE', true)
    return this.favoritePokemon
  }

  @Action({ commit: 'SET_INFO_POKEMON' })
  async getInfoPokemon (pokemon: pokemonResult): Promise<pokemonInfo[]> {
    let result: pokemonInfo[] = []

    await getPokemonApi(pokemon.url)
      .then(({ data }) => {
        const pokemonRes = {
          name: '',
          height: 0,
          imageId: 0,
          weight: 0,
          types: [],
          favorite: false
        }

        pokemonRes.name = data.name
        pokemonRes.height = data.height
        pokemonRes.imageId = data.id
        pokemonRes.weight = data.weight
        pokemonRes.types = data.types
        pokemonRes.favorite = pokemon.favorite

        result.push(pokemonRes)
      })
      .catch(() => {
        result = []
      })
    return result
  }

  @Action({ commit: 'SET_INFO_POKEMON' })
  cleanModal () {
    return []
  }
}

export default getModule(PokemonStore)
