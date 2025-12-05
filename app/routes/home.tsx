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
		<div
			className="container m-auto my-8 grid grid-cols-2 gap-4 px-4 lg:grid-cols-7 lg:px-0"
			style={{
				gridTemplateRows: `repeat(auto-fill, 1fr auto 1fr)`,
			}}
		>
			{heroes.map((hero) => (
				<CharacterCard key={hero.id} hero={hero} />
			))}
		</div>
	);
}
