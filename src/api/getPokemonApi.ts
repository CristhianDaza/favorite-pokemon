import get from 'axios'

const getPokemonApi = (data: string): Promise<any> => {
  const url = data
  return get(url)
}

export {
  getPokemonApi
}
