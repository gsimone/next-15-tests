"use client";

import { Suspense } from "react";
import { useSuspenseListPokemon } from "./data";
import { PokemonCard } from "./pokemonCard";


function PokemonList() {
  const { data } = useSuspenseListPokemon();

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((pokemon) => (
        <Suspense key={pokemon.name} fallback={<div className="h-34 w-34 flex items-center justify-center">...</div>}>
          <PokemonCard name={pokemon.name} id={pokemon.id} url={pokemon.url} />
        </Suspense>
      ))}
    </div>
  );
}

export default function PokemonPage() {
  return (
    <>
      <Suspense fallback={<div className="">Loading...</div>}>
        <PokemonList />
      </Suspense>
    </>
  );
}
