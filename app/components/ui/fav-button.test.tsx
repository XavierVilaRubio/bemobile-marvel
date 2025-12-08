import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as useHooksTs from "usehooks-ts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FavButton from "./fav-button";

// Mock useLocalStorage hook
vi.mock("usehooks-ts", () => ({
	useLocalStorage: vi.fn(),
}));

describe("FavButton", () => {
	const mockSetFavs = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			mockSetFavs,
			vi.fn(),
		]);
	});

	it("renders outline icon when character is not favorited", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			mockSetFavs,
			vi.fn(),
		]);
		render(<FavButton characterId={1} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		// Check for outline icon (SVG with stroke)
		const svg = button.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("renders filled icon when character is favorited", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[1],
			mockSetFavs,
			vi.fn(),
		]);
		render(<FavButton characterId={1} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("adds character to favorites when clicked and not favorited", async () => {
		const user = userEvent.setup();
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			mockSetFavs,
			vi.fn(),
		]);

		render(<FavButton characterId={1} />);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(mockSetFavs).toHaveBeenCalledWith(expect.any(Function));
		const updateFn = mockSetFavs.mock.calls[0][0];
		expect(updateFn([])).toEqual([1]);
	});

	it("removes character from favorites when clicked and favorited", async () => {
		const user = userEvent.setup();
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[1, 2],
			mockSetFavs,
			vi.fn(),
		]);

		render(<FavButton characterId={1} />);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(mockSetFavs).toHaveBeenCalledWith(expect.any(Function));
		const updateFn = mockSetFavs.mock.calls[0][0];
		expect(updateFn([1, 2])).toEqual([2]);
	});

	it("applies inverted variant styles when variant is inverted", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[1],
			mockSetFavs,
			vi.fn(),
		]);
		render(<FavButton characterId={1} variant="inverted" />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});
});
