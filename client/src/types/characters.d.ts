interface SwapiCharResponse {
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
  imageUrl: string;
}

interface CharactersMinimal {
  url: string;
  name: string;
}

interface PagedCharacterResponse {
  count: number;
  next: string;
  previous: string;
  results: SwapiCharResponse[];
}

interface CharacterOption {
  value: string;
  label: string;
}

interface ComparisonState {
  primary: string;
  secondary: string;
}