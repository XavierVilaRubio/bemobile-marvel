import SearchIcon from "~/components/icons/search-icon";
import CharacterCard from "~/components/ui/character-card";
import type { Hero } from "~/types";
import { getAllHeroes } from "../services/api";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader() {
	const heroes = await getAllHeroes();
	return {
		heroes: heroes.map((hero) => ({
			id: hero.id,
			name: hero.name,
			image: hero.images.lg,
		})) as Hero[],
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { heroes } = loaderData;
	return (
		<div className="container m-auto">
			<div className="mt-12 mb-6 space-y-3">
				<div className="flex items-center gap-2 border-black border-b pb-2">
					<SearchIcon className="size-3" />
					<input
						type="text"
						placeholder="Search a character..."
						className="w-full text-base uppercase placeholder:uppercase"
					/>
				</div>
				<p className="text-sm">50 RESULTS</p>
			</div>
			<div className="my-8 grid grid-cols-2 gap-4 px-4 lg:grid-cols-7 lg:px-0">
				{heroes.map((hero) => (
					<CharacterCard key={hero.id} hero={hero} />
				))}
			</div>
		</div>
	);
}
