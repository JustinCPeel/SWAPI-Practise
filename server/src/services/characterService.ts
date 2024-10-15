import axios from "axios";
import { swapiToCharacterResponse } from "../dto/converters/character.converter";
import {
  CharactersMinimal,
  PagedCharacterResponse,
  SwapiCharResponse,
} from "../dto/responses/charactersResponses";
import { CharacterFetch } from "../dto/requests/charactersRequests";
import { UnsplashService } from "./unsplashService";

export class CharacterService {
  private apiUrl: string;
  private unsplashService: UnsplashService;
  constructor() {
    this.apiUrl = "https://swapi.dev/api/people/";
    this.unsplashService = new UnsplashService();
  }

  public async fetchAllCharacters(): Promise<CharactersMinimal[]> {
    try {
      const firstFetch = await axios.get<PagedCharacterResponse>(this.apiUrl, {
        params: {
          page: 1,
        },
      });

      const maxCount = firstFetch.data.count;
      const resultsPerPage = firstFetch.data.results.length;
      const totalPages = Math.ceil(maxCount / resultsPerPage);

      const apiCalls = [];
      for (let i = 2; i <= totalPages; i++) {
        apiCalls.push(
          axios.get<PagedCharacterResponse>(this.apiUrl, {
            params: { page: i },
          })
        );
      }

      const allResponses = await Promise.all(apiCalls);

      const allCharacters = allResponses.reduce(
        (acc: SwapiCharResponse[], response) => {
          return acc.concat(response.data.results);
        },
        firstFetch.data.results
      );

      return allCharacters.map((character, index) =>
        swapiToCharacterResponse(character)
      );
    } catch (error) {
      throw error;
    }
  }

  public async fetchCharacterForUrl(
    req: CharacterFetch
  ): Promise<SwapiCharResponse> {
    try {
      const response = await axios.get<SwapiCharResponse>(req.url);
      const { name } = response.data;

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
