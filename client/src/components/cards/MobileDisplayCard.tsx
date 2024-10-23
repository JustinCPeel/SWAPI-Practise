import { AnimatePresence, motion } from "framer-motion";
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
  const [flipped, setFlipped] = useState<boolean>(false);

  const imagePath = useMemo(() => {
    return `/assets/images/characters/${selectedCharacter.name}.webp`;
  }, [selectedCharacter]);

  const characterDescription = useMemo(() => {
    return getCharacterDescriptionText(selectedCharacter.name);
  }, [selectedCharacter]);

  if (selectedCharacter.url === "") return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
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
            <Button
              label={"View Attributes"}
              onClick={() => setFlipped(false)}
            />
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
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileDisplayCard;
