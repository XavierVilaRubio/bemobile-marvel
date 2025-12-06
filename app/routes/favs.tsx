import { useSearchParams, useSubmit } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import CharacterCard from "~/components/ui/character-card";
import SearchBar from "~/components/ui/search-bar";
import type { Character } from "~/types";
import { getCharacters } from "../services/api";
import type { Route } from "./+types/favs";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const characters = await getCharacters();
	return {
		characters: characters.map((character) => ({
			id: character.id,
			name: character.name,
			image: character.images.lg,
		})) as Character[],
	};
}

export default function Favs({ loaderData }: Route.ComponentProps) {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search") || "";

	const submit = useSubmit();

	const { characters } = loaderData;
	const filteredCharacters = characters
		.filter((character) => favs.includes(character.id))
		.filter((character) =>
			character.name.toLowerCase().includes(search.toLowerCase()),
		);
	return (
		<div className="container m-auto space-y-6 pt-12">
			<p className="font-bold text-2xl uppercase">favorites</p>
			<div className="space-y-3">
				<SearchBar
					defaultValue={search}
					onChange={(event) => {
						submit(event.currentTarget);
					}}
				/>
				<p className="text-sm">{characters.length} RESULTS</p>
			</div>
			<div className="my-8 grid grid-cols-2 gap-4 px-4 lg:grid-cols-7 lg:px-0">
				{filteredCharacters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</div>
		</div>
	);
}
