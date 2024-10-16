export type SwapiCharResponse = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: "Male" | "Female" | "unknown" | "n/a";
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

export type ComparisonResponse = {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string;
};

export type CharactersMinimal = Pick<SwapiCharResponse, "url" | "name">;

export type PagedCharacterResponse = {
  count: number;
  next: string;
  previous: string;
  results: SwapiCharResponse[];
};
