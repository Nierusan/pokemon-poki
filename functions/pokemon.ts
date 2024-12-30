// function that generate an ID from an URL

export function getPokemonId (url: string): number {
  return parseInt(url.split('/').at(-2)!, 10) 
}