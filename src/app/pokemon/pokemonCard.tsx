import { useIntersectionObserver } from "@uidotdev/usehooks";
import Link from "next/link";
import { useSuspenseFetchPokemon } from "./data";
import Image from "next/image";

function PokemonCardInner({ name, id, url }: { name: string; id: number; url: string }) {
  const { data } = useSuspenseFetchPokemon(id, {
    enabled: true,
  });

  return (
    <div className="h-34 w-34">
      <div className="flex flex-col items-center justify-center">
        <Image src={data.sprites.front_default} alt={name} width={100} height={100} />
        {id} - {name}
      </div>
    </div>
  );
}

export function PokemonCard({ name, id, url }: { name: string; id: number; url: string }) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });


  return (
    <div className="h-34 w-34">
      <Link href={`/pokemon/${id}`} ref={ref}>
        {entry?.isIntersecting && <PokemonCardInner name={name} id={id} url={url} />}
      </Link>
    </div>
  );
}
