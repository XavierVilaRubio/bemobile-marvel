import { Form, useSearchParams, useSubmit } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import SearchIcon from "~/components/icons/search-icon";
import CharacterCard from "~/components/ui/character-card";
import type { Hero } from "~/types";
import { getHeroes } from "../services/api";
import type { Route } from "./+types/favs";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const heroes = await getHeroes();
	return {
		heroes: heroes.map((hero) => ({
			id: hero.id,
			name: hero.name,
			image: hero.images.lg,
		})) as Hero[],
	};
}

export default function Favs({ loaderData }: Route.ComponentProps) {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search") || "";

	const submit = useSubmit();

	const { heroes } = loaderData;
	const filteredHeroes = heroes
		.filter((hero) => favs.includes(hero.id))
		.filter((hero) => hero.name.toLowerCase().includes(search.toLowerCase()));
	return (
		<div className="container m-auto space-y-6 pt-12">
			<p className="font-bold text-2xl uppercase">favorites</p>
			<div className="space-y-3">
				<Form
					onChange={(event) => {
						submit(event.currentTarget);
					}}
				>
					<div className="flex items-center gap-2 border-black border-b pb-2">
						<SearchIcon className="size-3" />
						<input
							defaultValue={search}
							name="search"
							type="text"
							placeholder="Search a character..."
							className="w-full text-base uppercase placeholder:uppercase"
						/>
					</div>
				</Form>
				<p className="text-sm">{heroes.length} RESULTS</p>
			</div>
			<div className="my-8 grid grid-cols-2 gap-4 px-4 lg:grid-cols-7 lg:px-0">
				{filteredHeroes.map((hero) => (
					<CharacterCard key={hero.id} hero={hero} />
				))}
			</div>
		</div>
	);
}
