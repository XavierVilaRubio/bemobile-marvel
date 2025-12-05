import { Outlet } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import FavIcon from "~/components/icons/fav-icon";

export default function Layout() {
	const [favs] = useLocalStorage<number[]>("favs-characters", []);

	return (
		<>
			<header className="bg-black px-4 py-4 lg:px-0">
				<div className="container m-auto flex items-center justify-between">
					<img src="/marvel-logo.svg" alt="logo" />
					<div className="flex gap-2 p-2">
						<FavIcon />
						<span className="text-white">{favs.length}</span>
					</div>
				</div>
			</header>
			<Outlet />
		</>
	);
}
