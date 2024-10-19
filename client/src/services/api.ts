import axios from "axios";

export const searchCharacter = async (
  searchTerm: string
): Promise<CharacterOption[]> => {
  try {
    const response = await axios.get<CharactersMinimal[]>("characters", {
      params: { search: searchTerm },
    });
    return response.data.map((char) => ({ value: char.url, label: char.name }));
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "Error fetching characters"
    );
  }
};

export const fetchCharacterForUrl = async (
  url: string
): Promise<SwapiCharResponse> => {
  try {
    const response = await axios.get<SwapiCharResponse>("characters/selected", {
      params: { url: url },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "Error fetching character"
    );
  }
};

export const compareCharacterStats = async (
  characters: ComparisonState
): Promise<ComparisonResponse> => {
  try {
    const response = await axios.post<ComparisonResponse>(
      "characters",
      characters
    );
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "Error fetching character"
    );
  }
};
