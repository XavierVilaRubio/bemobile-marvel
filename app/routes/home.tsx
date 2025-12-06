import { useSearchParams, useSubmit } from "react-router";
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

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const search = url.searchParams.get("search");
	const characters = await getCharacters({ search });
	return {
		characters,
	};
}

// ref: https://programmingarehard.com/2025/02/24/debouncing-in-react-router-v7.html/
function requestNotCancelled(request: Request, ms: number) {
	const { signal } = request;
	return new Promise((resolve, reject) => {
		// If the signal is aborted by the time it reaches this, reject
		if (signal.aborted) {
			reject(signal.reason);
			return;
		}

		// Schedule the resolve function to be called in
		// the future a certain number of milliseconds
		const timeoutId = setTimeout(resolve, ms);

		// Listen for the abort event. If it fires, reject
		signal.addEventListener(
			"abort",
			() => {
				clearTimeout(timeoutId);
				reject(signal.reason);
			},
			{ once: true },
		);
	});
}

export async function clientLoader({
	request,
	serverLoader,
}: Route.ClientLoaderArgs) {
	await requestNotCancelled(request, 400);
	return await serverLoader();
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search") || "";

	const submit = useSubmit();

	const { characters } = loaderData;
	return (
		<div className="container m-auto space-y-6 pt-12">
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
				{characters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</div>
		</div>
	);
}
