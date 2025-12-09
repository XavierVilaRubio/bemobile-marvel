import type { Character } from "~/types";

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, options);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data: T = await response.json();
	return data;
}

const BASE_URL = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api";

export const getCharacters = async (
	{ search }: { search: string | null } = { search: null },
) => {
	const res = await fetchData<Character[]>(`${BASE_URL}/all.json`, {
		cache: "force-cache",
	});
	if (search)
		return res.filter((character) =>
			character.name.toLowerCase().includes(search.toLowerCase()),
		);

	return res;
};

export const getCharacter = async (id: number) => {
	const res = await fetchData<Character>(`${BASE_URL}/id/${id}.json`, {
		cache: "force-cache",
	});
	return res;
};
