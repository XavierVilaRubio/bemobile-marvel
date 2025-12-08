import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as useHooksTs from "usehooks-ts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FavLink from "./fav-link";

// Mock useLocalStorage hook
vi.mock("usehooks-ts", () => ({
	useLocalStorage: vi.fn(),
}));

// Mock FavIcon component
vi.mock("../icons/fav-icon", () => ({
	default: () => (
		<svg data-testid="fav-icon">
			<title>Fav Icon</title>
		</svg>
	),
}));

describe("FavLink", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			vi.fn(),
			vi.fn(),
		]);
	});

	it("renders favorite icon and count", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[1, 2, 3],
			vi.fn(),
			vi.fn(),
		]);

		render(
			<MemoryRouter initialEntries={["/"]}>
				<FavLink />
			</MemoryRouter>,
		);

		expect(screen.getByTestId("fav-icon")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("displays zero when no favorites", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			vi.fn(),
			vi.fn(),
		]);

		render(
			<MemoryRouter initialEntries={["/"]}>
				<FavLink />
			</MemoryRouter>,
		);

		expect(screen.getByText("0")).toBeInTheDocument();
	});

	it("renders as button on home page", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			vi.fn(),
			vi.fn(),
		]);

		render(
			<MemoryRouter initialEntries={["/"]}>
				<FavLink />
			</MemoryRouter>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("renders as link on character page", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			vi.fn(),
			vi.fn(),
		]);

		render(
			<MemoryRouter initialEntries={["/character/1"]}>
				<FavLink />
			</MemoryRouter>,
		);

		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/?favs=true");
	});

	it("updates count when favorites change", () => {
		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[],
			vi.fn(),
			vi.fn(),
		]);
		const { rerender } = render(
			<MemoryRouter initialEntries={["/"]}>
				<FavLink />
			</MemoryRouter>,
		);

		expect(screen.getByText("0")).toBeInTheDocument();

		vi.mocked(useHooksTs.useLocalStorage).mockReturnValue([
			[1, 2],
			vi.fn(),
			vi.fn(),
		]);
		rerender(
			<MemoryRouter initialEntries={["/"]}>
				<FavLink />
			</MemoryRouter>,
		);

		expect(screen.getByText("2")).toBeInTheDocument();
	});
});
