import axios from "axios";

import {
  PagedCharacterResponse,
  SwapiCharResponse,
} from "../dto/responses/charactersResponses";
import { CharacterService } from "../services/characterService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CharacterService", () => {
  let characterService: CharacterService;

  beforeEach(() => {
    characterService = new CharacterService();
  });

  describe("searchCharactersByTerm", () => {
    it("should return a list of characters based on the search term", async () => {
      const mockResponse: PagedCharacterResponse = {
        count: 1,
        results: [
          {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "19BBY",
            gender: "Male",
            homeworld: "https://swapi.dev/api/planets/1/",
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
              "https://swapi.dev/api/films/6/",
            ],
            species: [],
            vehicles: [
              "https://swapi.dev/api/vehicles/14/",
              "https://swapi.dev/api/vehicles/30/",
            ],
            starships: [
              "https://swapi.dev/api/starships/12/",
              "https://swapi.dev/api/starships/22/",
            ],
            created: "2014-12-09T13:50:51.644000Z",
            edited: "2014-12-20T21:17:56.891000Z",
            url: "https://swapi.dev/api/people/1/",
          },
        ],
        next: "",
        previous: "",
      };

      // Mock the Axios GET request to resolve with the mockResponse
      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: "https://swapi.dev/api/people/",
          params: { search: "Luke" },
        },
      });

      const result = await characterService.searchCharactersByTerm("Luke");
     
      expect(result).toEqual([
        {
          name: "Luke Skywalker",
          url: "https://swapi.dev/api/people/1/",
        },
      ]);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/",
        {
          params: { search: "Luke", page: 1 },
        }
      );
    });

    it("should throw an error if the API request fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        characterService.searchCharactersByTerm("Luke")
      ).rejects.toThrow("API Error");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/",
        {
          params: { search: "Luke", page: 1 },
        }
      );
    });
  });

  describe("fetchCharacterForUrl", () => {
    it("should fetch a character based on the provided URL", async () => {
      const mockCharacter: SwapiCharResponse = {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [],
        vehicles: [],
        species: [],
        starships: [],
        eye_color: "",
        gender: "Male",
        hair_color: "",
        skin_color: "",
        url: "https://swapi.dev/api/people/1/",
        created: "",
        edited: "",
      };

      const mockPlanet = {
        name: "Tatooine",
        climate: "arid",
        url: "https://swapi.dev/api/planet/1/",
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockCharacter,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: mockCharacter.url,
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: mockPlanet,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: mockPlanet.url,
        },
      });

      const result = await characterService.fetchCharacterForUrl({
        url: "https://swapi.dev/api/people/1/",
      });

      expect(result.name).toEqual("Luke Skywalker");
      expect(result.homeworld).toEqual(mockPlanet.name);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/1/"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/planets/1/"
      );
    });

    it("should throw an error if the API request fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        characterService.fetchCharacterForUrl({
          url: "https://swapi.dev/api/people/1/",
        })
      ).rejects.toThrow("API Error");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/1/"
      );
    });
  });

  describe("compareCharactersForUrls", () => {
    it("should compare two characters based on their URLs", async () => {
      const mockCharacter1: SwapiCharResponse = {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [],
        vehicles: [],
        species: [],
        starships: [],
        eye_color: "",
        gender: "Male",
        hair_color: "",
        skin_color: "",
        url: "",
        created: "",
        edited: "",
      };

      const mockCharacter2: SwapiCharResponse = {
        name: "Darth Vader",
        height: "202",
        mass: "136",
        birth_year: "41.9BBY",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [],
        vehicles: [],
        species: [],
        starships: [],
        eye_color: "",
        gender: "Male",
        hair_color: "",
        skin_color: "",
        url: "",
        created: "",
        edited: "",
      };

      const comparisonRequest = {
        primary: "https://swapi.dev/api/people/1/",
        secondary: "https://swapi.dev/api/people/2/",
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockCharacter1,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: comparisonRequest.primary,
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: mockCharacter2,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: comparisonRequest.secondary,
        },
      });

      const mockPlanet1 = {
        name: "Tatooine",
        climate: "arid",
        url: "https://swapi.dev/api/planet/1/",
      };

      const mockPlanet = {
        name: "Tatooine",
        climate: "arid",
        url: "https://swapi.dev/api/planet/1/",
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockPlanet1,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: mockPlanet1.url,
        },
      });

      mockedAxios.get.mockResolvedValueOnce({
        data: mockPlanet,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          url: mockPlanet.url,
        },
      });

      const result = await characterService.compareCharactersForUrls(
        comparisonRequest
      );

      expect(result.name.primary).toBe("Luke Skywalker");
      expect(result.name.secondary).toBe("Darth Vader");
      expect(result.height.primary).toBe("172");
      expect(result.height.secondary).toBe("202");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/1/"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/2/"
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/planets/1/"
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://swapi.dev/api/planets/1/"
      );
    });

    it("should throw an error if invalid character URLs are provided", async () => {
      const comparisonRequest = {
        primary: "",
        secondary: "",
      };

      await expect(
        characterService.compareCharactersForUrls(comparisonRequest)
      ).rejects.toThrow("Please provide valid characters to compare");
    });
  });
});
