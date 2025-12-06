export type Character = {
	id: number;
	name: string;
	slug: string;
	powerstats: {
		intelligence: number;
		strength: number;
		speed: number;
		durability: number;
		power: number;
		combat: number;
	};
	appearance: {
		gender: string;
		race: string | null;
		height: [string, string]; // A tuple for [imperial, metric]
		weight: [string, string]; // A tuple for [imperial, metric]
		eyeColor: string;
		hairColor: string;
	};
	biography: {
		fullName: string;
		alterEgos: string;
		aliases: string[];
		placeOfBirth: string;
		firstAppearance: string;
		publisher: string | null;
		alignment: "good" | "bad" | "neutral";
	};
	work: {
		occupation: string;
		base: string;
	};
	connections: {
		groupAffiliation: string;
		relatives: string;
	};
	images: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
	};
};
