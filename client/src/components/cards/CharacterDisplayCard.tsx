import { FC, useMemo } from "react";
import { useCharacter } from "../../hooks/useCharacter";
import { getCharacterDescriptionText } from "../../utils/description";
import { Attributes } from "./components";

const CharacterDisplayCard: FC<{ id: string }> = ({ id }) => {
  const { loading, error, selectedCharacter } = useCharacter();

  const getCharacterClassName = useMemo(() => {
    const characterClass = selectedCharacter.name.replace(/\s+/g, "-");
    return `card ${characterClass} ${loading ? "" : "loaded"}`;
  }, [selectedCharacter, loading]);

  const characterDescription = useMemo(() => {
    return getCharacterDescriptionText(selectedCharacter.name);
  }, [selectedCharacter]);

    debugger
  if (selectedCharacter.url === "") return null;

  return (
    <div id={id} className={getCharacterClassName}>
      <div className={`border ${loading ? "" : "loaded"}`}>
        <div className="title">
          <h2>{selectedCharacter.name}</h2>
          <p className="quote">{characterDescription.quote}</p>
        </div>

        {!loading && <Attributes />}
      </div>
      <div className="character-information">
        <p className="character-description">
          <b>About</b>
          <br />
          {characterDescription.description}
        </p>
      </div>
      {error && <div>Error loading character details.</div>}
    </div>
  );
};

export default CharacterDisplayCard;
