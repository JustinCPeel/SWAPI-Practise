import axios from "axios";

export const fetchCharacters = async (): Promise<CharactersMinimal[]> => {
  try {
    const response = await axios.get<CharactersMinimal[]>("characters");
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "Error fetching characters"
    );
  }
};

export const fetchCharacterForUrl = async (
  url: string
): Promise<CharactersMinimal[]> => {
  try {
    const response = await axios.get<SwapiCharResponse[]>(
      "characters/selected",
      { params: { url: url } }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "Error fetching character"
    );
  }
};
