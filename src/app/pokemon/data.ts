import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const getListPokemonOptions = () => {
  return queryOptions({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      const data = await response.json()

      const massaged = data.results.map((pokemon: { name: string, url: string }) => ({
        name: pokemon.name,
        id: pokemon.url.split('/').filter(Boolean).pop(),
        url: pokemon.url
      })) as { name: string, id: number, url: string }[]

      return massaged
    }
  })
}

export const useSuspenseListPokemon = () => {
  return useSuspenseQuery(getListPokemonOptions())
}



export const getPokemonOptions = (id: number) => {

  return queryOptions({
    queryKey: ['pokemon', id],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json()

      return data as {
        sprites: {
          front_default: string
        },
        name: string,
      }
    },
  })
}

export const useSuspenseFetchPokemon = (id: number) => {
  return useSuspenseQuery(getPokemonOptions(id))
}