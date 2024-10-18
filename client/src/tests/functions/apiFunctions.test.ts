import axios from "axios";
import {
  compareCharacterStats,
  fetchCharacterForUrl,
  searchCharacter,
} from "../../services/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Character API integration tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("searchCharacter", () => {
    it("should return a list of characters based on entered search term", async () => {
      const mockResponse = {
        data: [
          { url: "https://swapi.dev/api/people/1/", name: "Luke Skywalker" },
          { url: "https://swapi.dev/api/people/2/", name: "Darth Vader" },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await searchCharacter("Skywalker");

      expect(mockedAxios.get).toHaveBeenCalledWith("characters", {
        params: { search: "Skywalker" },
      });

      expect(result).toEqual([
        { value: "https://swapi.dev/api/people/1/", label: "Luke Skywalker" },
        { value: "https://swapi.dev/api/people/2/", label: "Darth Vader" },
      ]);
    });

    it("should throw an error if fetching characters fails", async () => {
      const mockError = {
        response: { data: { message: "Character not found" } },
      };

      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(searchCharacter("Skywalker")).rejects.toThrow(
        "Character not found"
      );
    });
  });

  describe("fetchCharacterForUrl", () => {
    it("should return character data on success", async () => {
      const mockResponse = {
        data: { name: "Luke Skywalker", homeworld: "Tatooine", species: [] },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchCharacterForUrl(
        "https://swapi.dev/api/people/1/"
      );

      expect(mockedAxios.get).toHaveBeenCalledWith("characters/selected", {
        params: { url: "https://swapi.dev/api/people/1/" },
      });

      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if fetching the character fails", async () => {
      const mockError = {
        response: { data: { message: "Error fetching character" } },
      };

      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(
        fetchCharacterForUrl("https://swapi.dev/api/people/1/")
      ).rejects.toThrow("Error fetching character");
    });
  });

  describe("compareCharacterStats", () => {
    it("should return comparison data on success", async () => {
      const mockResponse = {
        data: { name: "Luke Skywalker", homeworld: "Tatooine", species: [] },
      };

      const mockCharacters: ComparisonState = {
        primary: "https://swapi.dev/api/people/1/",
        secondary: "https://swapi.dev/api/people/2/",
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await compareCharacterStats(mockCharacters);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        "characters",
        mockCharacters
      );

      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if comparing characters fails", async () => {
      const mockError = {
        response: { data: { message: "Error comparing characters" } },
      };

      mockedAxios.post.mockRejectedValueOnce(mockError);

      const mockCharacters: ComparisonState = {
        primary: "https://swapi.dev/api/people/1/",
        secondary: "https://swapi.dev/api/people/2/",
      };

      await expect(compareCharacterStats(mockCharacters)).rejects.toThrow(
        "Error comparing characters"
      );
    });
  });
});
