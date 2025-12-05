import type { SVGProps } from "react";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<title>Search</title>
		<path
			fill="#000"
			d="M22.98 21.293c.217.217.217.563 0 .736l-.994.995c-.174.216-.52.216-.736 0l-5.236-5.236a.698.698 0 0 1-.13-.389v-.563C14.285 18.178 12.25 19 10 19c-4.976 0-9-4.024-9-9 0-4.933 4.024-9 9-9 4.933 0 9 4.067 9 9 0 2.25-.865 4.327-2.207 5.885h.563c.13 0 .26.086.39.173l5.235 5.235ZM10 16.923A6.916 6.916 0 0 0 16.923 10c0-3.808-3.115-6.923-6.923-6.923A6.916 6.916 0 0 0 3.077 10 6.888 6.888 0 0 0 10 16.923Z"
		/>
	</svg>
);
export default SearchIcon;
