"use client";

import { useSuspenseFetchPokemon } from "../data";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PokemonPage() {
  const params = useParams();
  const { data } = useSuspenseFetchPokemon(Number(params.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={data.sprites.front_default} alt={data.name} width={100} height={100} />
      </CardContent>
    </Card>
  );
}

export default PokemonPage;
