import {
  CharactersMinimal,
  SwapiCharResponse,
} from "../responses/charactersResponses";

export const swapiToCharacterResponse = ({
  url,
  name,
}: SwapiCharResponse): CharactersMinimal => ({
  url,
  name,
});
