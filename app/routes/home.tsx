import { Form, useSearchParams, useSubmit } from "react-router";
import SearchIcon from "~/components/icons/search-icon";
import CharacterCard from "~/components/ui/character-card";
import type { Hero } from "~/types";
import { getHeroes } from "../services/api";
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
	const heroes = await getHeroes({ search });
	return {
		heroes: heroes.map((hero) => ({
			id: hero.id,
			name: hero.name,
			image: hero.images.lg,
		})) as Hero[],
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

	const { heroes } = loaderData;
	return (
		<div className="container m-auto">
			<div className="mt-12 mb-6 space-y-3">
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
				{heroes.map((hero) => (
					<CharacterCard key={hero.id} hero={hero} />
				))}
			</div>
		</div>
	);
}
