import axios from "axios";
import { swapiToCharacterResponse } from "../dto/converters/character.converter";
import {
  CharacterFetch,
  ComparisonRequest,
} from "../dto/requests/charactersRequests";
import {
  CharactersMinimal,
  ComparisonResponse,
  PagedCharacterResponse,
  PreferenceComparison,
  SwapiCharResponse,
} from "../dto/responses/charactersResponses";
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
      for (let i = 2; i < totalPages; i++) {
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

      return allCharacters.map((character) =>
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

  /**
   * This functions purpose is to compare the stats of two characters received via API and generate a comparison to display on the UI.
   *
   * @throws Throws an error if the API request fails.
   * @returns {Promise<SwapiCharResponse>} The full details of the character being searched
   */
  public async compareCharactersForUrls(
    req: ComparisonRequest
  ): Promise<ComparisonResponse> {
    try {
      if (req.primary === "" || req.secondary === "")
        throw Error("Please provide valid characters to compare");

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

  /**
   * This function serves as helper function to populate the difference of attibutes assigned to each character
   *  @param {SwapiCharResponse[]} charsToCompare - List of 2 characters to compare attributes against.
   * @throws Throws an error if there are not enough characters for comparison.
   * @returns {Promise<SwapiCharResponse>} The full details of the character being searched
   */
  private async compareAttributesForCharacters(
    charsToCompare: SwapiCharResponse[]
  ): Promise<ComparisonResponse> {
    try {
      if (charsToCompare.length !== 2)
        throw new Error("Expected exactly two characters for comparions");
      const [firstCharacter, secondCharacter] = charsToCompare;

      const comparison: ComparisonResponse = {
        name: {
          primary: firstCharacter.name,
          secondary: secondCharacter.name,
        },
        birth_year: {
          primary: firstCharacter.birth_year,
          secondary: secondCharacter.birth_year,
          descritpion: this.compareBirthYears(firstCharacter, secondCharacter),
        },
        mass: {
          primary: firstCharacter.mass,
          secondary: secondCharacter.mass,
          descritpion: this.compareMass(firstCharacter, secondCharacter),
        },
        height: {
          primary: firstCharacter.height,
          secondary: secondCharacter.height,
          descritpion: this.compareHeight(firstCharacter, secondCharacter),
        },
        gender: this.getPreferentialComparisonResponse(
          firstCharacter,
          secondCharacter,
          "gender",
          "gender"
        ),
        eye_color: this.getPreferentialComparisonResponse(
          firstCharacter,
          secondCharacter,
          "eye_color",
          "eye colour"
        ),
        hair_color: this.getPreferentialComparisonResponse(
          firstCharacter,
          secondCharacter,
          "hair_color",
          "hair colour"
        ),
        skin_color: this.getPreferentialComparisonResponse(
          firstCharacter,
          secondCharacter,
          "skin_color",
          "skin colour"
        ),
        homeworld: {
          primary: await this.getCharacterHomeWorld(firstCharacter.homeworld),
          secondary: await this.getCharacterHomeWorld(
            secondCharacter.homeworld
          ),
        },
        films: {
          primary: firstCharacter.films.length.toString(),
          secondary: secondCharacter.films.length.toString(),
          descritpion: `There is a difference of ${Math.abs(
            firstCharacter.films.length - secondCharacter.films.length
          )} in film appearances`,
        },
      };

      return comparison;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This function serves as helper function to return a suitable message for preferential comparisons,
   * attributes that can not be compared mathematically or with a calculation, but can be compared using statistics.
   *
   * Even though the attributes can be compared, it is still a preferential comparison based on a persons preference.
   *  @param {SwapiCharResponse} firstCharacter - First character for comparison.
   *  @param {SwapiCharResponse} secondCharacter - Second character for comparison.
   * @param {keyof SwapiCharResponse} key - The key of the attribute we are comparing against.
   * @param {string} attribute - The string representation of the attribute for reading purposes.
   * @throws Throws an error if the comparison objects values by key are not of 'String' type.
   * @returns {PreferenceComparison} - An object containing the compared values with a default message.
   */
  private getPreferentialComparisonResponse(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse,
    key: keyof SwapiCharResponse,
    attribute: string
  ): PreferenceComparison {
    const primaryValue = firstCharacter[key];
    const secondaryValue = secondCharacter[key];
    if (
      typeof primaryValue !== "string" ||
      typeof secondaryValue !== "string"
    ) {
      throw Error(`${key}: Value is not of proper format.`);
    }

    return {
      primary: primaryValue,
      secondary: secondaryValue,
      descritpion: `We can not compare the ${attribute} of characters, as it is a personal preference.`,
    };
  }

  /**
   * Compares the height of two characters.
   *
   * @param {SwapiCharResponse}firstCharacter - An instace of our character to use for comparison
   * @param {SwapiCharResponse}secondCharacter - A secondary instance of our character to compare against.
   * @returns {string} - The result of which character is taller and the difference in heigh / default message if no height values to compare.
   */
  private compareHeight(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse
  ): string {
    if (!firstCharacter.height || !secondCharacter.height) {
      return "No height to compare";
    }

    const firstHeight = parseFloat(firstCharacter.height);
    const secondHeight = parseFloat(secondCharacter.height);

    const difference = Math.abs(firstHeight - secondHeight);

    const tallerCharacterMessage =
      firstHeight === secondHeight
        ? `${firstCharacter.name} and ${secondCharacter.name} are of equal height`
        : firstHeight > secondHeight
        ? `${firstCharacter.name} is taller than ${secondCharacter.name}`
        : `${secondCharacter.name} is taller than ${firstCharacter.name}`;

    return `${tallerCharacterMessage}. The height difference is ${difference} units.`;
  }

  /**
   * Compares the mass of two characters.
   *
   * @param {SwapiCharResponse}firstCharacter - An instace of our character to use for comparison
   * @param {SwapiCharResponse}secondCharacter - A secondary instance of our character to compare against.
   * @returns {string} - The result of which character has a grater mass and the difference in mass / default message if no mass values to compare.
   */
  private compareMass(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse
  ): string {
    if (!firstCharacter.mass || !secondCharacter.mass) {
      return "No mass to compare";
    }

    const firstMass = parseInt(firstCharacter.mass, 10);
    const secondMass = parseInt(secondCharacter.mass, 10);

    const difference = Math.abs(firstMass - secondMass);

    const massCharacterMessage =
      firstMass === secondMass
        ? `${firstCharacter.name} and ${secondCharacter.name} are of equal mass`
        : firstMass > secondMass
        ? `${firstCharacter.name} has a greater mass than ${secondCharacter.name}`
        : `${secondCharacter.name} has a greater mass than ${firstCharacter.name}`;

    return `${massCharacterMessage}. The mass difference is ${difference} units.`;
  }

  /**
   * Compares the birth years of two characters.
   * Since 'Star Wars' characters have a birth year either in the 'BBY' or 'ABY' era.
   * This functions main focus is to determine which character is older based on the era with 'BBY' being older than 'ABY'
   * It then finds the actual difference in age as a numeric value.
   *
   * @param {SwapiCharResponse}firstCharacter - An instace of our character to use for comparison
   * @param {SwapiCharResponse}secondCharacter - A secondary instance of our character to compare against.
   * @throws {string} - For this particular function when an error occurs it returns a defaulted string value.
   * @returns {string} - The result comparison between birth years.
   */
  private compareBirthYears(
    firstCharacter: SwapiCharResponse,
    secondCharacter: SwapiCharResponse
  ): string {
    const firstBirthYear = this.parseBirthYear(firstCharacter.birth_year);
    const secondBirthYear = this.parseBirthYear(secondCharacter.birth_year);

    if (!firstBirthYear || !secondBirthYear) {
      return "No valid birth years to compare";
    }

    const { year: firstYear, isBBY: isFirstBBY } = firstBirthYear;
    const { year: secondYear, isBBY: isSecondBBY } = secondBirthYear;

    const ageDifference = Math.abs(firstYear - secondYear);
    const olderMessage =
      isFirstBBY && !isSecondBBY
        ? `${firstCharacter.name} is older than ${secondCharacter.name}`
        : !isFirstBBY && isSecondBBY
        ? `${secondCharacter.name} is older than ${firstCharacter.name}`
        : `${firstCharacter.name} and ${secondCharacter.name} were born in the same era`;

    return `${olderMessage}. The age difference is ${ageDifference} years.`;
  }

  private parseBirthYear(
    birthYear: string
  ): { year: number; isBBY: boolean } | null {
    const parsedYear = parseFloat(birthYear.replace(/BBY|ABY/, ""));
    const isBBY = birthYear.includes("BBY");

    if (isNaN(parsedYear)) {
      return null;
    }

    return { year: parsedYear, isBBY };
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
}
