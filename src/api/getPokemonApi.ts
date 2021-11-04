import get from 'axios'

const getPokemonApi = (data: string): Promise<any> => {
  const url = `https://pokeapi.co/api/v2/${data}`
  return get(url)
}

export {
  getPokemonApi
}
