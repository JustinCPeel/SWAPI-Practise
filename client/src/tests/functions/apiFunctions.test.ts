const axios = require("axios");
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
        response: { data: {} },
      };

      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(searchCharacter("Skywalker")).rejects.toThrow(
        "Character not found"
      );
    });

    it("should return an empty list if no characters match the search term", async () => {
      const mockResponse = { data: [] };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await searchCharacter("NonExistentCharacter");

      expect(mockedAxios.get).toHaveBeenCalledWith("characters", {
        params: { search: "NonExistentCharacter" },
      });

      expect(result).toEqual([]);
    });

    it("should throw an error for an invalid search term", async () => {
      await expect(searchCharacter("")).rejects.toThrow("Invalid search term");
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

    it("should throw an error for an invalid URL", async () => {
      await expect(fetchCharacterForUrl("invalid-url")).rejects.toThrow(
        "Invalid URL"
      );
    });

    it("should return null if no data is returned for a valid URL", async () => {
      const mockResponse = { data: null };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchCharacterForUrl(
        "https://swapi.dev/api/people/1/"
      );
      expect(result).toBeNull();
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

    it("should throw an error if primary character URL is missing", async () => {
      const mockCharacters: ComparisonState = {
        primary: "",
        secondary: "https://swapi.dev/api/people/2/",
      };

      await expect(compareCharacterStats(mockCharacters)).rejects.toThrow(
        "Primary character URL is required"
      );
    });

    it("should handle unexpected response structure", async () => {
      const mockResponse = { data: { unexpectedField: "value" } };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const mockCharacters: ComparisonState = {
        primary: "https://swapi.dev/api/people/1/",
        secondary: "https://swapi.dev/api/people/2/",
      };

      const result = await compareCharacterStats(mockCharacters);
      expect(result).toBeUndefined(); 
    });
  });

  it("should throw an error when a 404 status code is returned", async () => {
    const mockError = {
      response: { status: 404, data: { message: "Not Found" } },
    };

    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(searchCharacter("NonExistentCharacter")).rejects.toThrow(
      "Not Found"
    );
  });

  it("should throw an error when a 500 status code is returned", async () => {
    const mockError = {
      response: { status: 500, data: { message: "Server Error" } },
    };

    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(
      fetchCharacterForUrl("https://swapi.dev/api/people/1/")
    ).rejects.toThrow("Server Error");
  });
});
