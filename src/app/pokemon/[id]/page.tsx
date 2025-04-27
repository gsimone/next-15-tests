'use client'

import { useSuspenseFetchPokemon } from "../data"
import { useParams } from 'next/navigation'
import Image from "next/image"

export function PokemonPage() {
  const params = useParams()
  const { data } = useSuspenseFetchPokemon(Number(params.id))

  return <div>
    <h3 className="text-2xl font-bold">{data.name}</h3>
    <Image src={data.sprites.front_default} alt={data.name} width={100} height={100} />
  </div>
}

export default PokemonPage