import type { SVGProps } from "react";

const FavIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="#fff"
		{...props}
	>
		<title>Fav Icon</title>
		<path
			fillRule="evenodd"
			d="M12 4.642 6 1 0 4.642v7.803l12 10.231 12-10.23V4.641L18 1l-6 3.642Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default FavIcon;
