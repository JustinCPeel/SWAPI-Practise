import { FC, useMemo, useState } from "react";
import { useCharacter } from "../../hooks/useCharacter";
import { Attributes, MobileAttributes } from "./components";
import Button from "../button/Button";
import { getCharacterDescriptionText } from "../../utils/description";

interface FlippyProps {
  description?: string;
  padded?: boolean;
  id: string;
}

const FlippyCard: FC<FlippyProps> = ({ id }) => {
  const { characterDetails, selectedCharacter } = useCharacter();
  const [flipped, setFlipped] = useState(false);

  const imagePath = useMemo(() => {
    return `/assets/images/characters/${selectedCharacter.name}.webp`;
  }, [selectedCharacter]);

  const characterDescription = useMemo(() => {
    return getCharacterDescriptionText(selectedCharacter.name);
  }, [selectedCharacter]);

  if (characterDetails.name === "") return null;
  return (
    <div
      className={`flippy-card ${flipped ? "flipped" : ""} has-description`}
      id={id}
    >
      <div className="fliffy-wrapper-image"></div>
      <div className="flippy-content">
        <div className={`flippy-front padded`} onClick={() => setFlipped(true)}>
          <img
            src={imagePath}
            alt={characterDetails.name}
            width={100}
            height={150}
          />
          <p className={`flippy-title`}>{characterDetails.name}</p>
          <p className="flippy-sub-title">{characterDescription.quote}</p>
          <p></p>
          <Button label={"View Attributes"} onClick={() => setFlipped(false)} />
        </div>
        <div className={`flippy-back padded`}>
          <MobileAttributes description={characterDescription.description} />
          <Button label={"Back to Photo"} onClick={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

export default FlippyCard;
