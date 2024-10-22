import { useMemo } from "react";
import { useCharacter } from "../../../hooks/useCharacter";
import { CharacterAttribute } from "./CharacterAttribute";
import { FACTIONS, formatFactionName } from "../../../utils/factions";
interface FactionInformation {
  faction: string;
}

export const Attributes = () => {
  const { characterDetails } = useCharacter();

  const getCharacterFactionWithFactionImage = (characterName: string) => {
    let factionDetails: FactionInformation = {
      faction: "Dark Side",
    };
    for (const [faction, details] of Object.entries(FACTIONS)) {
      if (details.characters.includes(characterName)) {
        factionDetails = { faction };
        break;
      }
    }

    return formatFactionName(factionDetails.faction);
  };

  const memoizedCharacterFaction = useMemo(() => {
    return getCharacterFactionWithFactionImage(characterDetails.name);
  }, [characterDetails]);

  return (
    <div className="icons">
      <div className="icon-column">
        <CharacterAttribute
          icon={"birth"}
          attribute={"Date of birth"}
          value={characterDetails.birth_year}
        />
        <CharacterAttribute
          icon={"planet"}
          attribute={"Home Planet"}
          value={characterDetails.homeworld}
        />
        <CharacterAttribute
          icon={"gender"}
          attribute={"Gender"}
          value={characterDetails.gender}
        />
        <CharacterAttribute
          icon={"height"}
          attribute={"Height"}
          value={`${characterDetails.height} (cm)`}
        />

        <CharacterAttribute
          icon={"weight"}
          attribute={"Weight"}
          value={`${characterDetails.mass} (kg)`}
        />
      </div>
      <div className="icon-column">
        <CharacterAttribute
          icon={"hair"}
          attribute={"Hair Colour"}
          value={characterDetails.hair_color}
        />
        <CharacterAttribute
          icon={"skin"}
          attribute={"Skin Colour"}
          value={characterDetails.skin_color}
        />
        <CharacterAttribute
          icon={"eye"}
          attribute={"Eye Colour"}
          value={characterDetails.eye_color}
        />
        <CharacterAttribute
          icon={"movie"}
          attribute={"Movie Appearances"}
          value={characterDetails.films.length.toString()}
        />
        <CharacterAttribute
          icon={"movie"}
          attribute={"Faction"}
          value={memoizedCharacterFaction}
        />
      </div>
    </div>
  );
};
