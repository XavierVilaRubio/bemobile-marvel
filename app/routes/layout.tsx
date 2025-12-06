import { Link, Outlet } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import FavIcon from "~/components/icons/fav-icon";

export default function Layout() {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);

	return (
		<>
			<header className="bg-black px-4 py-4 lg:px-0">
				<div className="container m-auto flex items-center justify-between">
					<Link to="/">
						<img src="/marvel-logo.svg" alt="logo" />
					</Link>
					<Link to="/favs" className="flex items-center gap-2">
						<FavIcon />
						<span className="text-white">{favs.length}</span>
					</Link>
				</div>
			</header>
			<Outlet />
		</>
	);
}
