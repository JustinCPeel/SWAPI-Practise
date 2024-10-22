import { FC, useMemo, useState } from "react";
import { useCharacter } from "../../hooks/useCharacter";
import { getCharacterDescriptionText } from "../../utils/description";
import Button from "../button/Button";
import { MobileAttributes } from "./components";

interface MobileCardProps {
  description?: string;
  padded?: boolean;
  id: string;
}

const MobileDisplayCard: FC<MobileCardProps> = ({ id }) => {
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
      className={`mobile-character-card ${
        flipped ? "flipped" : ""
      } has-description`}
      id={id}
    >
      <div className="mobile-character-wrapper-image"></div>
      <div className="mobile-character-content">
        <div
          className={`mobile-character-front padded`}
          onClick={() => setFlipped(true)}
        >
          <img
            src={imagePath}
            alt={characterDetails.name}
            width={100}
            height={150}
          />
          <p className={`mobile-character-title`}>{characterDetails.name}</p>
          <p className="mobile-character-sub-title">
            {characterDescription.quote}
          </p>
          <p></p>
          <Button label={"View Attributes"} onClick={() => setFlipped(false)} />
        </div>
        <div className={`mobile-character-back padded`}>
          <MobileAttributes description={characterDescription.description} />
          <Button
            label={"Back to Photo"}
            onClick={() => setFlipped(false)}
            id={characterDetails.name}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileDisplayCard;
