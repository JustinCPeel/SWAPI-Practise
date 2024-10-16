import { motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";
import { useCharacter } from "../../hooks/useCharacter";
import { getCharacterDescriptionText } from "../../utils/description";
import { FACTIONS } from "../../utils/factions";
import { Loader } from "../loader";
import { CharacterAttribute, CharacterDisplay } from "./components";

interface FactionInformation {
  faction: string;
  image: string;
}

const formatFactionName = (name: string) => {
  const camelCaseName = name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      return index < 2
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase();
    })
    .join(" ");

  return camelCaseName;
};

const CharacterDisplayCard: FC<{ id: string }> = ({ id }) => {
  const { characterDetails, loading, error, selectedCharacter } =
    useCharacter();

  const getCharacterFactionWithFactionImage = (characterName: string) => {
    let factionDetails: FactionInformation = {
      faction: "Dark Side",
      image: "",
    };
    for (const [faction, details] of Object.entries(FACTIONS)) {
      if (details.characters.includes(characterName)) {
        factionDetails = { faction, image: details.image };
        break;
      }
    }

    return (
      <div className={`title title-${factionDetails.faction}`}>
        <img width={25} height={25} src="./public/logo.png" />
        <span>{formatFactionName(factionDetails.faction)}</span>
      </div>
    );
  };

  const memoizedCharacterFaction = useMemo(() => {
    return getCharacterFactionWithFactionImage(selectedCharacter.name);
  }, [selectedCharacter]);

  const memoizedCharacterDescritption = useMemo(() => {
    const description = getCharacterDescriptionText(selectedCharacter.name);

    return (
      <>
        <TypingText text={description.quote} />
      </>
    );
  }, [selectedCharacter.name]);

  return (
    <div id={id} className="character-display-card">
      <>
        <CharacterDisplay />
        <div className="character-information">
          {loading ? (
            <Loader loading={loading} key={`${id}-loader`} />
          ) : (
            <>
              <h1>{selectedCharacter.name}</h1>
              <div id={`faction-${selectedCharacter.name}`} className="faction">
                {memoizedCharacterFaction}
              </div>
              {getCharacterDescriptionText(selectedCharacter.name).quote}
              <div className="character-attributes">
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
              </div>
            </>
          )}
        </div>
      </>
      {error && <div>Error loading character details.</div>}
    </div>
  );
};

export default CharacterDisplayCard;

const TypingText = ({ text }: { text: string }): any => {
  const [displayedText, setDisplayedText] = useState(""); 

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]); 
      index++;

      if (index === text.length) {
        clearInterval(intervalId); 
      }
    }, 100); 

    return () => clearInterval(intervalId); 
  }, [text]);

  return (
    <>
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ color: "white" }}
      >
        {displayedText}
      </motion.div>
    </>
  );
};
