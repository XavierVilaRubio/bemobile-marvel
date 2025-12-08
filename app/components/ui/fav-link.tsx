import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import FavIcon from "../icons/fav-icon";

const FavLink = () => {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);
	const [favsCount, setFavsCount] = useState(0);
	useEffect(() => {
		setFavsCount(favs.length);
	}, [favs]);

	const [, setSearchParams] = useSearchParams();

	return (
		<button
			type="button"
			className="flex cursor-pointer items-center gap-2"
			onClick={() =>
				setSearchParams((searchParams) => {
					searchParams.set("favs", "true");
					return searchParams;
				})
			}
		>
			<FavIcon />
			<span className="text-white">{favsCount}</span>
		</button>
	);
};

export default FavLink;
