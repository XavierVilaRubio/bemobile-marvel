import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import type { Character } from "~/types";
import CharacterCard from "./character-card";

// Mock FavButton component
vi.mock("./fav-button", () => ({
	default: ({ characterId }: { characterId: number }) => (
		<button type="button" data-testid={`fav-button-${characterId}`}>
			Fav
		</button>
	),
}));

const mockCharacter: Character = {
	id: 1,
	name: "Spider-Man",
	slug: "spider-man",
	powerstats: {
		intelligence: 90,
		strength: 55,
		speed: 67,
		durability: 75,
		power: 74,
		combat: 85,
	},
	appearance: {
		gender: "Male",
		race: "Human",
		height: ["5'10", "178 cm"],
		weight: ["165 lb", "75 kg"],
		eyeColor: "Hazel",
		hairColor: "Brown",
	},
	biography: {
		fullName: "Peter Parker",
		alterEgos: "No alter egos found.",
		aliases: ["Spidey", "Web-Head"],
		placeOfBirth: "New York, New York",
		firstAppearance: "Amazing Fantasy #15",
		publisher: "Marvel Comics",
		alignment: "good",
	},
	work: {
		occupation: "Freelance photographer",
		base: "New York City",
	},
	connections: {
		groupAffiliation: "Avengers, formerly Secret Defenders",
		relatives: "May Parker (Aunt)",
	},
	images: {
		xs: "https://example.com/xs.jpg",
		sm: "https://example.com/sm.jpg",
		md: "https://example.com/md.jpg",
		lg: "https://example.com/lg.jpg",
	},
};

describe("CharacterCard", () => {
	it("renders character name", () => {
		render(
			<MemoryRouter>
				<CharacterCard character={mockCharacter} />
			</MemoryRouter>,
		);

		const names = screen.getAllByText("Spider-Man");
		expect(names.length).toBeGreaterThan(0);
		expect(names[0]).toBeInTheDocument();
	});

	it("renders character image with correct src and alt", () => {
		render(
			<MemoryRouter>
				<CharacterCard character={mockCharacter} />
			</MemoryRouter>,
		);

		const image = screen.getByAltText("Spider-Man");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", mockCharacter.images.lg);
	});

	it("links to character detail page", () => {
		render(
			<MemoryRouter>
				<CharacterCard character={mockCharacter} />
			</MemoryRouter>,
		);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/character/1");
	});

	it("renders favorite button", () => {
		render(
			<MemoryRouter>
				<CharacterCard character={mockCharacter} />
			</MemoryRouter>,
		);

		const favButtons = screen.getAllByTestId("fav-button-1");
		expect(favButtons.length).toBeGreaterThan(0);
		expect(favButtons[0]).toBeInTheDocument();
	});
});
