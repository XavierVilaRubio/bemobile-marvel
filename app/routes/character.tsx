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
			<div className="container m-auto flex max-w-2/5 gap-12">
				<img
					src={character.images.lg}
					alt={character.name}
					className="aspect-square w-full max-w-80 object-cover"
				/>
				<div>
					<h1 className="font-bold text-4xl uppercase">{character.name}</h1>
					{/* <p className="text-sm">{character.biography.fullName}</p> */}
				</div>
			</div>
		</div>
	);
}
