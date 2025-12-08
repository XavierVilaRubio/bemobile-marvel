import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./search-bar";

describe("SearchBar", () => {
	it("renders search input with placeholder", () => {
		render(<SearchBar />);

		const input = screen.getByPlaceholderText("Search a character...");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "text");
		expect(input).toHaveAttribute("name", "search");
	});

	it("displays search icon", () => {
		render(<SearchBar />);

		const svg = document.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("accepts defaultValue prop", () => {
		render(<SearchBar defaultValue="Spider-Man" />);

		const input = screen.getByDisplayValue("Spider-Man");
		expect(input).toBeInTheDocument();
	});

	it("calls onChange handler when user types", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<SearchBar onChange={handleChange} />);

		const input = screen.getByPlaceholderText("Search a character...");
		await user.type(input, "Iron Man");

		expect(handleChange).toHaveBeenCalled();
	});

	it("accepts all standard input props", () => {
		render(
			<SearchBar defaultValue="test" disabled aria-label="Search characters" />,
		);

		const input = screen.getByPlaceholderText("Search a character...");
		expect(input).toBeDisabled();
		expect(input).toHaveAttribute("aria-label", "Search characters");
	});
});
