"use client";

import { Suspense } from "react";
import { useSuspenseFetchPokemon, useSuspenseListPokemon } from "./data";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function PokemonCardImage({ name, id }: { name: string; id: number }) {
  const { data } = useSuspenseFetchPokemon(id);

  return (
    <Image
      style={{
        imageRendering: "pixelated",
      }}
      className="w-full h-full object-cover"
      src={data.sprites.front_default}
      alt={name}
      width={100}
      height={100}
    />
  );
}

const PokemonCard = ({ name, id }: { name: string; id: number }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  return (
    <Link href={`/pokemon/${id}`} className="w-[350px] h-[400px] relative overflow-hidden p-0"  >
      <Card ref={ref} key={name} className="relative h-full w-full">
        <CardContent className="p-0 h-full">
        <Suspense key={name} fallback={<div className="flex items-center justify-center">...</div>}>
          {entry?.isIntersecting && <PokemonCardImage name={name} id={id} />}
        </Suspense>
      </CardContent>
      <div className="absolute bottom-0 left-0 p-4 z-10">
        <CardTitle className=" drop-shadow-md capitalize">
          #{id} - {name}
          </CardTitle>
        </div>
      </Card>
    </Link>
  );
};

function PokemonList() {
  const { data } = useSuspenseListPokemon();



  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((pokemon) => (
        <PokemonCard key={pokemon.id} name={pokemon.name} id={pokemon.id} url={pokemon.url} />
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
