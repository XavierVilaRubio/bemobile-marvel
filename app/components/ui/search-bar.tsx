import type { ComponentProps } from "react";
import { Form } from "react-router";
import SearchIcon from "../icons/search-icon";

const SearchBar = ({
	defaultValue,
	...props
}: ComponentProps<typeof Form> & {
	defaultValue: ComponentProps<"input">["defaultValue"];
}) => {
	return (
		<Form {...props}>
			<div className="flex items-center gap-2 border-black border-b pb-2">
				<SearchIcon className="size-3" />
				<input
					defaultValue={defaultValue}
					name="search"
					type="text"
					placeholder="Search a character..."
					className="w-full text-base uppercase placeholder:uppercase"
				/>
			</div>
		</Form>
	);
};

export default SearchBar;
