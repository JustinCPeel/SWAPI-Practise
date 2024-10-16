import axios from "axios";
import { swapiToCharacterResponse } from "../dto/converters/character.converter";
import {
  CharactersMinimal,
  ComparisonResponse,
  PagedCharacterResponse,
  SwapiCharResponse,
} from "../dto/responses/charactersResponses";
import {
  CharacterFetch,
  ComparisonRequest,
} from "../dto/requests/charactersRequests";
import { PlanetResponse } from "../dto/responses/planetResponses";

/**
 * The CharacterService is a class based service which is used to fetch the data from the SWAPI.
 *
 * @function searchCharactersByTerm - fetches list of characters based on search term, if term is blank returns entire list.
 * @function fetchCharacterForUrl - fetches specific character details by the unique URL attached to a list entry.
 */
export class CharacterService {
  private apiUrl: string;
  constructor() {
    this.apiUrl = "https://swapi.dev/api/people/";
  }

  /**
   * This functions purpose is fetch a list of all characters from the SWAPI resource based on a search criteria.
   * It increments and fetches per page as the SWAPI api limits the payload to 10 by default.
   *
   * @throws Throws an error if the API request fails.
   * @returns {Promise<CharactersMinimal[]>}List of All characters Unfiltered by a search term
   */
  public async searchCharactersByTerm(
    searchTeam: string
  ): Promise<CharactersMinimal[]> {
    try {
      const firstFetch = await axios.get<PagedCharacterResponse>(this.apiUrl, {
        params: {
          search: searchTeam,
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
            params: { search: searchTeam, page: i },
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

  /**
   * This functions purpose is fetch the details of a direct character based on the URL linked to character which is received by the list API as no unique ID is assigned to payload from API.
   *
   * @throws Throws an error if the API request fails.
   * @returns {Promise<SwapiCharResponse>} The full details of the character being searched
   */
  public async fetchCharacterForUrl(
    req: CharacterFetch
  ): Promise<SwapiCharResponse> {
    try {
      const response = await axios.get<SwapiCharResponse>(req.url);
      const { homeworld, ...rest } = response.data;

      const characterHomeWorld = await this.getCharacterHomeWorld(homeworld);

      return { ...response.data, homeworld: characterHomeWorld };
    } catch (error) {
      throw error;
    }
  }

  public async compareCharactersForUrls(
    req: ComparisonRequest
  ): Promise<ComparisonResponse> {
    try {
      const primary = axios.get<SwapiCharResponse>(req.primary);
      const secondary = axios.get<SwapiCharResponse>(req.secondary);

      const results = await Promise.all([primary, secondary]);

      const attriubuteComparison = this.compareAttributesForCharacters(
        results.map((res) => res.data)
      );

      return attriubuteComparison;
    } catch (error) {
      throw error;
    }
  }

  private async compareAttributesForCharacters(
    charsToCompare: SwapiCharResponse[]
  ): Promise<ComparisonResponse> {
    if (charsToCompare.length !== 2)
      throw new Error("Expected exactly two characters for comparions");
    const [firstCharacter, secondCharacter] = charsToCompare;

    const filmCounts = {
      firstCharacter: firstCharacter.films.length + 1,
      secondCharacter: secondCharacter.films.length + 1,
    };

    const comparison: ComparisonResponse = {
      birth_year: this.compareBirthYears(firstCharacter, secondCharacter),
      mass: this.compareMass(firstCharacter, secondCharacter),
      height: this.compareHeight(firstCharacter, secondCharacter),
      gender: `${firstCharacter.name} is ${firstCharacter.gender}, ${secondCharacter.name} has ${secondCharacter.gender}`,
      eye_color: `${firstCharacter.name} has ${firstCharacter.eye_color} eyes, ${secondCharacter.name} has ${secondCharacter.eye_color} eyes`,
      hair_color: `${firstCharacter.name} has ${firstCharacter.hair_color} hair, ${secondCharacter.name} has ${secondCharacter.hair_color} hair`,
      skin_color: `${firstCharacter.name} has ${firstCharacter.skin_color} skin, ${secondCharacter.name} has ${secondCharacter.skin_color} skin`,
      homeworld: "",
      films: `${firstCharacter.name} appeared in ${filmCounts.firstCharacter} films, ${secondCharacter.name} appeared in ${filmCounts.secondCharacter}`,
    };

    return comparison;
  }

  private compareHeight(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse
  ): string {
    if (!firstCharacter.height) return "No height to compare";
    if (!secondCharacter.height) return "No height to compare";

    const firstHeight = parseFloat(firstCharacter.height);
    const secondHeight = parseFloat(secondCharacter.height);

    const difference = Math.abs(firstHeight - secondHeight);

    return `The height difference between ${firstCharacter.name} (${firstHeight}) and ${secondCharacter.name} (${secondHeight}) is ${difference}`;
  }

  private compareMass(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse
  ): string {
    if (!firstCharacter.mass) return "No mass to compare";
    if (!secondCharacter.mass) return "No mass to compare";

    const firstMass = parseInt(firstCharacter.mass, 10);
    const secondMass = parseInt(secondCharacter.mass, 10);

    const difference = Math.abs(firstMass - secondMass);

    return `The weight difference between ${firstCharacter.name} (${firstMass}) and ${secondCharacter.name} (${secondMass}) is ${difference}`;
  }

  /**
   * This functions purpose is fetch the name of the homeworld to use with the character response.
   *
   * @throws Throws an error if the API request fails.
   * @returns {Promise<string>} The home planets's name based on the url passed to the function
   */
  private async getCharacterHomeWorld(homeworldUrl: string): Promise<string> {
    try {
      const response = await axios.get<PlanetResponse>(homeworldUrl);
      const { name } = response.data;

      return name;
    } catch (error) {
      throw error;
    }
  }

  private compareBirthYears(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse
  ): string {
    const firstBirthYear = firstCharacter.birth_year;
    const firstName = firstCharacter.name;

    const secondBirthYear = secondCharacter.birth_year;
    const secondName = secondCharacter.name;

    const parsedFirstCharacterBirthYear = parseInt(
      firstBirthYear.replace(/BBY|ABY/, ""),
      10
    );
    const parsedSecondCharacterBirthYear = parseInt(
      secondBirthYear.replace(/BBY|ABY/, ""),
      10
    );

    const isFirstBBY = firstBirthYear.includes("BBY");
    const isSecondBBY = secondBirthYear.includes("BBY");

    if (!isFirstBBY && !isSecondBBY) {
      let ageDifference: number = Math.abs(
        parsedFirstCharacterBirthYear - parsedSecondCharacterBirthYear
      );
      if (parsedSecondCharacterBirthYear > parsedFirstCharacterBirthYear)
        ageDifference = Math.abs(
          parsedSecondCharacterBirthYear - parsedFirstCharacterBirthYear
        );
      return `The age difference is between ${firstName} (born in ${firstBirthYear}) and ${secondName} (born in ${secondBirthYear}) is ${ageDifference}.`;
    }

    if (isFirstBBY && isSecondBBY) {
      let ageDifference: number = Math.abs(
        parsedFirstCharacterBirthYear - parsedSecondCharacterBirthYear
      );
      if (parsedSecondCharacterBirthYear > parsedFirstCharacterBirthYear)
        ageDifference = Math.abs(
          parsedSecondCharacterBirthYear - parsedFirstCharacterBirthYear
        );
      return `The age difference is between ${firstName} (born in ${firstBirthYear}) and ${secondName} (born in ${secondBirthYear}) is ${ageDifference}.`;
    }

    if (isFirstBBY && !isSecondBBY) {
      const ageDifference =
        parsedFirstCharacterBirthYear + parsedSecondCharacterBirthYear;
      return `${firstName} (born in ${firstBirthYear}) is older than ${secondName} (born in ${secondBirthYear}) by ${ageDifference} years. `;
    }

    if (!isFirstBBY && isSecondBBY) {
      const ageDifference =
        parsedFirstCharacterBirthYear + parsedSecondCharacterBirthYear;
      return `${firstName} (born in ${firstBirthYear}) is older than ${secondName} (born in ${secondBirthYear}) by ${ageDifference} years. `;
    }

    return "Are the Birth Years correct?";
  }
}
