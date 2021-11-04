import { getModule, Module, Mutation, VuexModule, config, Action } from 'vuex-module-decorators'
import store from '@/store'
import { getPokemonApi } from '@/api/getPokemonApi'
import { pokemonResult } from '@/typings'
import { Loading } from '@/store/module'

config.rawError = true

@Module({
  name: 'pokemonStore',
  namespaced: true,
  dynamic: true,
  store
})

class PokemonStore extends VuexModule {
  public pokemonList:pokemonResult[] = [];

  get PokemonList () {
    return this.pokemonList
  }

  @Mutation
  SET_POKEMON (payload: pokemonResult[]): void {
    this.pokemonList = payload
  }

  @Action({ commit: 'SET_POKEMON' })
  async getPokemon () {
    Loading.SET_LOADING(true)
    let result:pokemonResult[] = []

    await getPokemonApi('pokemon')
      .then(({ data }) => {
        data.results.forEach((pokemon: pokemonResult) => {
          pokemon.favorite = false
          result.push(pokemon)
        })
      })
      .catch(() => {
        result = []
      })
    Loading.SET_LOADING(false)
    return result
  }

  @Action({ commit: 'SET_POKEMON' })
  getFavorite (name: string) {
    this.pokemonList.forEach(pokemon => {
      if (pokemon.name === name) {
        if (pokemon.favorite === false) {
          pokemon.favorite = true
        } else {
          pokemon.favorite = false
        }
      }
    })
    return this.pokemonList
  }
}

export default getModule(PokemonStore)
