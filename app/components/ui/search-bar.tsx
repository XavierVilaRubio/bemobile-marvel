import type { ComponentProps } from "react";
import SearchIcon from "../icons/search-icon";

const SearchBar = (props: ComponentProps<"input">) => {
	return (
		<div className="flex items-center gap-2 border-black border-b pb-2">
			<SearchIcon className="size-3" />
			<input
				{...props}
				name="search"
				type="text"
				placeholder="Search a character..."
				className="w-full text-base uppercase placeholder:uppercase"
			/>
		</div>
	);
};

export default SearchBar;
