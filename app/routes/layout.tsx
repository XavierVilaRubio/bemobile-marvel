import { Outlet } from "react-router";

export default function Layout() {
	return (
		<>
			<header className="bg-black px-4 py-4 lg:px-0">
				<div className="container m-auto flex items-center justify-between">
					<img src="/marvel-logo.svg" alt="logo" />
					<div className="flex gap-2 p-2">
						<img src="/fav-icon.svg" alt="favs" />
						<span className="text-white">3</span>
					</div>
				</div>
			</header>
			<Outlet />
		</>
	);
}
