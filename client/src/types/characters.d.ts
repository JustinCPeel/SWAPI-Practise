interface SwapiCharResponse {
  name: string; // The name of this person
  birth_year: string; // The birth year of the person (BBY or ABY)
  eye_color: string; // The eye color of this person, "unknown" or "n/a" if applicable
  gender: "Male" | "Female" | "unknown" | "n/a"; // The gender of this person
  hair_color: string; // The hair color of this person, "unknown" or "n/a" if applicable
  height: string; // The height of the person in centimeters
  mass: string; // The mass of the person in kilograms
  skin_color: string; // The skin color of this person
  homeworld: string; // The URL of the person's homeworld (planet resource)
  films: string[]; // Array of film resource URLs that this person has appeared in
  species: string[]; // Array of species resource URLs that this person belongs to
  starships: string[]; // Array of starship resource URLs that this person has piloted
  vehicles: string[]; // Array of vehicle resource URLs that this person has piloted
  url: string; // The hypermedia URL of this resource
  created: string; // ISO 8601 date format when the resource was created
  edited: string; // ISO 8601 date format when the resource was last edited
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
