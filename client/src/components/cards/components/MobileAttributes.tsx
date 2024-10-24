import { FC, useMemo } from "react";
import { useCharacter } from "../../../hooks/useCharacter";
import { FACTIONS, formatFactionName } from "../../../utils/factions";
import { CharacterAttribute } from "./CharacterAttribute";
interface FactionInformation {
  faction: string;
}

interface MobileAttributesProps {
  description: string;
}

export const MobileAttributes: FC<MobileAttributesProps> = ({ description }) => {
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
    <>
      <p>{description}</p>
      <div className="attribute-wrapper">
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
        <CharacterAttribute
          icon={"hair"}
          attribute={"Hair Colour"}
          value={characterDetails.hair_color}
        />
      </div>
      <div className="attribute-wrapper">
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
    </>
  );
};
