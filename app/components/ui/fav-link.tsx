import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import FavIcon from "../icons/fav-icon";

const FavLink = () => {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);
	const [favsCount, setFavsCount] = useState(0);
	useEffect(() => {
		setFavsCount(favs.length);
	}, [favs]);

	return (
		<Link to="/favs" className="flex items-center gap-2">
			<FavIcon />
			<span className="text-white">{favsCount}</span>
		</Link>
	);
};

export default FavLink;
