import FavButton from "~/components/ui/fav-button";
import { getCharacter } from "~/services/api";
import type { Route } from "./+types/character";

export async function loader({ params }: Route.LoaderArgs) {
	const character = await getCharacter(Number(params.characterId));
	return { character };
}

export default function Character({ loaderData }: Route.ComponentProps) {
	const { character } = loaderData;
	return (
		<div
			className="w-full bg-black text-white"
			style={
				{
					borderBottomRightRadius: "24px",
					cornerShape: "bevel",
				} as React.CSSProperties
			}
		>
			<div className="container m-auto flex flex-col lg:max-w-1/2 lg:flex-row lg:gap-12">
				<img
					src={character.images.lg}
					alt={character.name}
					className="aspect-square w-full object-cover lg:max-w-80"
				/>
				<div className="my-auto space-y-6 px-4 pt-6 pb-12 lg:p-0">
					<div className="flex items-center justify-between">
						<h1 className="font-bold text-3xl uppercase lg:text-4xl">
							{character.name}
						</h1>
						<FavButton
							characterId={character.id}
							className="size-6"
							variant="inverted"
						/>
					</div>
					<p>
						Know as {character.biography.fullName}, born in{" "}
						{character.biography.placeOfBirth}. First appearance in{" "}
						{character.biography.firstAppearance}. Publisher:{" "}
						{character.biography.publisher}. Works as {character.work.base}.
						Connected to groups: {character.connections.groupAffiliation}.
						{/* Relatives: {character.connections.relatives}. */}
					</p>
				</div>
			</div>
		</div>
	);
}
