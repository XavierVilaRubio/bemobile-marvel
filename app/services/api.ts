async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, options);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data: T = await response.json();
	return data;
}

const BASE_URL = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api";

type HeroResponse = {
	id: number;
	name: string;
	images: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
	};
};

export const getAllHeroes = async () => {
	const res = await fetchData<HeroResponse[]>(`${BASE_URL}/all.json`, {
		cache: "force-cache",
	});
	return res;
};
