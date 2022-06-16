import { consultService } from '@/services/apiConfig'

export const getPokemonAll = new Promise((resolve, reject): void => {
  try {
    const response = consultService.request({
      method: 'get'
    })
    resolve(response)
  } catch (error) {
    console.log(error)
    reject(error)
  }
})

export const getPokemon = (idPokemon: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      const response = consultService.request({
        method: 'get',
        url: idPokemon
      })
      resolve(response)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
