import { useSearchParams } from "react-router";
import { useDebounceCallback, useLocalStorage } from "usehooks-ts";
import CharacterCard from "~/components/ui/character-card";
import SearchBar from "~/components/ui/search-bar";
import { getCharacters } from "../services/api";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	const url = new URL(request.url);
	const search = url.searchParams.get("search");
	const favs = url.searchParams.get("favs") === "true";
	const characters = await getCharacters({
		search: favs ? null : search,
	});
	return {
		characters,
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [favsCharacters] = useLocalStorage<number[]>("favs-characters", []);
	const search = searchParams.get("search") || "";
	const isFavs = searchParams.get("favs") === "true";

	const { characters } = loaderData;

	const debouncedSetSearchParams = useDebounceCallback((value: string) => {
		setSearchParams((searchParams) => {
			searchParams.set("search", value);
			return searchParams;
		});
	}, 500);

	const selectedCharacters = isFavs
		? characters
				.filter((character) => favsCharacters.includes(character.id))
				.filter((character) =>
					character.name.toLowerCase().includes(search.toLowerCase()),
				)
		: characters;
	return (
		<div className="container m-auto space-y-6 px-4 pt-12 lg:px-0">
			{isFavs && <p className="font-bold text-2xl uppercase">favorites</p>}

			<div className="space-y-3">
				<SearchBar
					defaultValue={search}
					onChange={(event) => {
						debouncedSetSearchParams(event.currentTarget.value);
					}}
				/>
				<p className="text-sm">{selectedCharacters.length} RESULTS</p>
			</div>
			<div className="my-8 grid grid-cols-2 gap-4 lg:grid-cols-7">
				{selectedCharacters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</div>
		</div>
	);
}
