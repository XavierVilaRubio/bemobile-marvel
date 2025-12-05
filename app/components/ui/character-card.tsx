import clsx from "clsx";
import type { Hero } from "~/types";
import FavButton from "./fav-button";

const CharacterCard = ({ hero }: { hero: Hero }) => {
	return (
		<div
			className="group h-full gap-0 overflow-hidden"
			style={
				{
					borderBottomRightRadius: "16px",
					cornerShape: "bevel",
				} as React.CSSProperties
			}
		>
			<img
				src={hero.image}
				alt={hero.name}
				className="aspect-square w-full object-cover"
			/>
			<div className="h-[5px] w-full bg-primary"></div>
			<div className="grid text-white">
				<div className="col-start-1 row-start-1 flex items-center justify-between bg-black px-4 pt-4 pb-6">
					<h2 className="text-sm uppercase leading-none">{hero.name}</h2>
					<FavButton characterId={hero.id} variant="inverted" />
				</div>
				<div
					className={clsx(
						"col-start-1 row-start-1 flex items-center justify-between bg-primary px-4 pt-4 pb-6",
						"transition-all duration-300 [clip-path:inset(0%_0%_100%_0%)] group-hover:[clip-path:inset(0%_0%_0%_0%)]",
					)}
				>
					<h2 className="text-sm uppercase leading-none">{hero.name}</h2>
					<FavButton characterId={hero.id} />
				</div>
			</div>
		</div>
	);
};

export default CharacterCard;
