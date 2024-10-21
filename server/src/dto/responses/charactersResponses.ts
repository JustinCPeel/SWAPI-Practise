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

export type PreferenceComparison = {
  primary: string;
  secondary: string;
  descritpion: string;
};

export type ComparisonResponse = {
  name: {
    primary: string;
    secondary: string;
  };
  birth_year: PreferenceComparison;
  eye_color: PreferenceComparison;
  gender: PreferenceComparison;
  hair_color: PreferenceComparison;
  height: PreferenceComparison;
  mass: PreferenceComparison;
  skin_color: PreferenceComparison;
  homeworld: {
    primary: string;
    secondary: string;
  };
  films: PreferenceComparison;
};

export type CharactersMinimal = Pick<SwapiCharResponse, "url" | "name">;

export type PagedCharacterResponse = {
  count: number;
  next: string;
  previous: string;
  results: SwapiCharResponse[];
};
