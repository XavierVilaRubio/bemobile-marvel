import clsx from "clsx";
import { type SVGProps, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import FavIcon from "../icons/fav-icon";

const PrimaryFavIcon = (props: SVGProps<SVGSVGElement>) => (
	<FavIcon {...props} className={clsx(props.className, "fill-primary")} />
);
const OutlineFavIcon = (props: SVGProps<SVGSVGElement>) => (
	<FavIcon
		{...props}
		className={clsx(
			props.className,
			"overflow-visible fill-none stroke-3 stroke-white",
		)}
	/>
);

const FavButton = ({
	characterId,
	variant = "default",
	...props
}: {
	characterId: number;
	variant?: "default" | "inverted";
} & SVGProps<SVGSVGElement>) => {
	const [favs, setFavs] = useLocalStorage<number[]>("favs-characters", []);
	const [isFav, setIsFav] = useState(false);
	useEffect(() => {
		setIsFav(favs.includes(characterId));
	}, [favs, characterId]);

	const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isFav) {
			setFavs((p) => p.filter((id) => id !== characterId));
		} else {
			setFavs((p) => [...p, characterId]);
		}
	};
	return (
		<button type="button" onClick={handleFav}>
			{isFav ? (
				<PrimaryFavIcon
					{...props}
					className={clsx(props.className, "size-3", {
						"fill-primary": variant === "inverted",
						"fill-white": variant === "default",
					})}
				/>
			) : (
				<OutlineFavIcon
					{...props}
					className={clsx(props.className, "size-3")}
				/>
			)}
		</button>
	);
};

export default FavButton;
