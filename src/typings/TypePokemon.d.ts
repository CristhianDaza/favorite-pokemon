export interface pokemonResult {
  name: string
  url: string
  favorite: boolean
  id: string
}

interface type {
  name: string
  url: string
}

interface types {
  slot: number
  type: type
}

export interface pokemonInfo {
  name: string
  height: number
  imageId: number
  types: types[]
  weight: number
}
