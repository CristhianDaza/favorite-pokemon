export const copyClipboard = async (pokemonInfo: string): Promise<void> => {
  return await navigator.clipboard.writeText(pokemonInfo)
}
