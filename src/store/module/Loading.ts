import { getModule, Module, Mutation, VuexModule, config } from 'vuex-module-decorators'
import store from '@/store'

config.rawError = true

@Module({
  name: 'loading',
  namespaced: true,
  dynamic: true,
  store
})

class LoadingStore extends VuexModule {
  public isLoading = true;

  get IsLoading (): boolean {
    return this.isLoading
  }

  @Mutation
  SET_LOADING (payload: boolean): void {
    this.isLoading = payload
  }
}

export default getModule(LoadingStore)
