import { Link, Outlet } from "react-router";
import FavLink from "~/components/ui/fav-link";

export default function Layout() {
	return (
		<>
			<header className="bg-black px-4 py-4 lg:px-0">
				<div className="container m-auto flex items-center justify-between">
					<Link to="/">
						<img src="/marvel-logo.svg" alt="logo" />
					</Link>
					<FavLink />
				</div>
			</header>
			<Outlet />
		</>
	);
}
