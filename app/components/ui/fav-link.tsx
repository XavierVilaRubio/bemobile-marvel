import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import FavIcon from "../icons/fav-icon";

const Content = () => {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);
	const [favsCount, setFavsCount] = useState(0);
	useEffect(() => {
		setFavsCount(favs.length);
	}, [favs]);
	return (
		<>
			<FavIcon />
			<span className="text-white">{favsCount}</span>
		</>
	);
};

const FavLink = () => {
	const location = useLocation();
	const isCharacterPage = location.pathname.includes("character");

	const [, setSearchParams] = useSearchParams();

	if (isCharacterPage)
		return (
			<Link to="/?favs=true" className="flex cursor-pointer items-center gap-2">
				<Content />
			</Link>
		);

	return (
		<button
			type="button"
			className="flex cursor-pointer items-center gap-2"
			onClick={() => setSearchParams({ favs: "true" })}
		>
			<Content />
		</button>
	);
};

export default FavLink;
