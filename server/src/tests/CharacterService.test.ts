import axios from "axios";
import { CharacterService } from "../services/characterService";
import { PagedCharacterResponse } from "../dto/responses/charactersResponses";
import {
  EMPTY_PAGED_RESPONSE,
  PAGED_CHARACTER_RESPOSE,
} from "./mocks/characterMocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const AXIOS_OPTIONS = {
  status: 200,
  statusText: "OK",
  headers: {},
  config: { url: "https://swapi.dev/api/people/" },
};

describe("CharactersService", () => {
  let characterService: CharacterService;
  let url: string = "https://swapi.dev/api/people/";

  beforeEach(() => {
    characterService = new CharacterService();
    jest.clearAllMocks();
  });

  describe("searchCharactersByTerm", () => {
    it("seacrching with no keyword, should return a list of characters", async () => {
      const expectedApiResponse: PagedCharacterResponse =
        PAGED_CHARACTER_RESPOSE;

      mockedAxios.get.mockResolvedValueOnce({
        ...AXIOS_OPTIONS,
        data: expectedApiResponse,
      });

      const result = await characterService.searchCharactersByTerm("");

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(url, {
        params: {
          search: "",
          page: 1,
        },
      });

      expect(result).toEqual(
        expectedApiResponse.results.map((data) => ({
          name: data.name,
          url: data.url,
        }))
      );
    });

    it("seacrching with keyword, should return a list of characters containing", async () => {
      const expectedApiResponse: PagedCharacterResponse =
        PAGED_CHARACTER_RESPOSE;

      mockedAxios.get.mockResolvedValueOnce({
        ...AXIOS_OPTIONS,
        data: expectedApiResponse,
      });

      const result = await characterService.searchCharactersByTerm("Luke");

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(url, {
        params: {
          search: "Luke",
          page: 1,
        },
      });

      expect(result).toEqual(
        expectedApiResponse.results.map((res) => ({
          name: res.name,
          url: res.url,
        }))
      );
    });

    it("should throw an error if it fails to retrieve data from api call", async () => {
      // I am not 100% sure what error SWAPI would send back, but this is a generic error, I often get in C#.
      const mockedError = new Error("ERR_NETWORK");

      mockedAxios.get.mockRejectedValueOnce(mockedError);
      await expect(
        characterService.searchCharactersByTerm("Luke")
      ).rejects.toThrow("ERR_NETWORK");

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(url, {
        params: {
          search: "Luke",
          page: 1,
        },
      });
    });
  });

  it("seacrching with keyword, should return a blank list if no characters are found for the search term", async () => {
    const expectedApiResponse: PagedCharacterResponse = EMPTY_PAGED_RESPONSE;

    mockedAxios.get.mockResolvedValueOnce({
      ...AXIOS_OPTIONS,
      data: expectedApiResponse,
    });

    const result = await characterService.searchCharactersByTerm("Luke");

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      params: {
        search: "Luke",
        page: 1,
      },
    });

    expect(result).toEqual(
      expectedApiResponse.results.map((res) => ({
        name: res.name,
        url: res.url,
      }))
    );

    expect(result).toHaveLength(0);
  });

  describe("searchCharactersByTerm", () => {});
});
